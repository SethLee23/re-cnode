<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="lists" v-else>
      <ul
        class="titleList"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loadingMore"
        infinite-scroll-distance="10"
      >
        <li v-for="list in lists" v-if="list.last_reply">
          <div class="left_li">
            <div class="img_title"> <router-link :to="{ name:'user_Info', params:{ name:list.author.loginname }}" >
                <img :src="list.author.avatar_url" alt />
              </router-link>
              <div class="left_content">
                <router-link class="authorName" style :to="{ name:'user_Info', params:{ name:list.author.loginname }}" >{{list.author.loginname}}</router-link>
                <!-- </div> -->
                <!-- <div > -->
                <router-link class="title" style="flex:1;display:flex;align-items:center" :to="{ name:'post_content', params:{ id:list.id, name:list.author.loginname }}" >
                  <span>{{list.title}}</span>
                </router-link>
              </div>
              <!-- </div> -->
            </div>
          </div>

          <div class="right_li">
            <div class="articleInfo">
              <div class="view">
                <div class="view_1">浏览</div>
                <div class="viewNum">{{list.visit_count}}</div>
              </div>
              <div class="comments">
                <div class="comments_1">评论</div>
                <div class="commentNum">{{list.reply_count}}</div>
              </div>
              <div class="type">
                <div class="type_1">类型</div>
                <div
                  :class="[{good:(list.good==true||list.top==true)},{other:(list.good!=true&&list.top!=true)}]"
                >{{list|tabFormatter}}</div>
              </div>
            </div>
            <div class="replies">
              <div class="lastComment">最近评论</div>
              <div class="replyWrapper">
                <div>
                  <img
                    :src="list.last_reply.author.avatar_url"
                    style="width:30px;height: 30px;border-radius:50%;"
                  />
                </div>
                <div class="commentContent">{{list.last_reply.author.loginname}}</div>
                <div class="last_reply_at">{{list.last_reply_at|formatDate}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <back-to-top></back-to-top>
    <Pagination @handel="changePage" class="ifshowPagination" ></Pagination>
  </div>
</template>

<script>
import Vue from "vue";
import Pagination from "./Pagination";
import fetch_g from "../modules/fetch_g";
import url from "../modules/api";
import { InfiniteScroll } from "mint-ui";

Vue.use(InfiniteScroll);
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      lists: {},
      page: 1,
      loadingMore: false,
      allLoaded: false,
      limit: 10,
      tab: '',
    };
  },
  components: {
    Pagination
  },
  beforeMount() {},
  created() {
    this.isLoading = true;
    this.getPostList();
  },
  mounted() {
  },
  watch: {
    $route(from, to) {
      this.getPostList();
    }
  },
  methods: {
    loadMore(){
      if(window.ontouchstart===null){
        this.getPostList()
      }else{
        this.loadingMore = false
        return
      }
    },
    getPostList() {
      let that = this;
      if (this.allLoaded) return;
      this.loadingMore = true;
      fetch_g(url.topics, {
        params: {
          page: this.page,
          limit: this.limit,
          tab: this.$route.params.tab
        }
      }).then(res => {
        let list = res.data.data;
        let arr = [];
        list.map((item, index) => {
          fetch_g(`${url.article}${item.id}`).then(res => {
            let len = res.data.data.replies.length;
            // 添加属性
            arr.push(
              Object.assign({}, item, {
                last_reply: res.data.data.replies[len - 1],
                tabs: this.$route.params.tab
              })
            );
            //当获取的数组的长度等于请求数据的条数时，才开始判断
            if (arr.length == this.limit) {
              if (arr.length < this.limit) {
                that.allLoaded = true;
              }
              if (that.lists.length&&arr[0].tabs===that.lists[0].tabs) {
                that.lists = that.lists.concat(arr);
              } else {
                that.lists = arr;
                console.log(this.lists)
              }
              this.loadingMore = false;
              this.page++;
            }
          });
        });
        this.isLoading = false;
      });
    },

    changePage(value) {
      console.log("传入page");
      this.page = value;
      this.getPostList();
    }
  }
};
</script>


<style lang="less" scoped>
@font-face {
  font-family: "dolly";
  src: url(../../font/dolly-roman.woff.ttf);
}
@font-face {
  font-family: "droid";
  src: url(../../font/DroidSansFallbackBold.ttf);
}
@font-face {
  font-family: "pika";
  src: url(../../font/FangZhengPiKaPiKa-2.ttf);
}
@font-face {
  font-family: "shiguang";
  src: url(../../font/ShiGuangManManZou-2.ttf);
}

@font-face {
  font-family: "cambo";
  src: url(../../font/Cambo-Regular.otf);
}
//font-family
.lastComment,
.view_1,
.comments_1,
.type_1 {
  font-family: droid;
}
.title span,
.last_reply_at {
  font-family: shiguang;
}
.viewNum,
.commentNum {
  font-family: pika;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "宋体", "Courier New", sans-serif, "Times New Roman",
    "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB",
    "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

li {
  list-style-type: none;
  display: flex;
  flex: 1;
}
.loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  display: inline-block;
  margin: 0 100px;
}
.PostList {
  max-width: 1094px;
  margin: 0 auto;
  margin-top: 14px;
}

.good,
.other {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  border-radius: 3px;
  color: #fff;
  font-family: shiguang;
}
.good {
  background: #80bd01;
}
.other {
  background: #999999;
}
.titleList {
  background: #3a3f41 url(../assets/note-bg.jpg);
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 4px;
}
.titleList li {
  border: 1px solid rgb(225, 225, 225);
  margin: 1% 10%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 3px 15px 4px rgba(51, 51, 51, 0.2);
}
ul.titleList > li {
  position: relative;
  padding: 6px 0;
}
ul.titleList > li::before {
  content: "";
  width: 3px;
  position: absolute;
  left: 5px;
  top: 6%;
  height: 88%;
  border-radius: 2px;
}
ul.titleList > li:nth-child(n)::before {
  background: #bfdbd2;
  opacity: 0.8;
}
ul.titleList > li:nth-child(2n)::before {
  background: #dcb239;
  opacity: 0.6;
}
ul.titleList > li:nth-child(3n)::before {
  background: #fedcd2;
}
ul.titleList > li:nth-child(4n)::before {
  background: #df744a;
  opacity: 0.6;
}
ul.titleList > li:hover::before {
  opacity: 1;
}
.titleList li:hover {
  box-shadow: 0 3px 15px 3px rgba(51, 51, 51, 0.5);
  transform: scale(1.05);
  transition: all 0.5s;
  background: rgb(245, 245, 245);
}
.right_li {
  flex: 11;
  display: flex;
  flex-direction: column;
  padding: 5px 5px;
  border-left: 1px solid #dddddd;
  margin-left: 5px;
}
.left_li {
  flex: 13;
  display: flex;
  align-items: center;
  width: 100%;
}

.last_reply_at {
  margin-left: auto;
  margin-right: 10px;
  color: #778087;
  font-size: 12px;
}
.title:focus,
.title:hover {
  color: #005580;
}
.title:active,
.title:hover {
  outline: 0;
}
.title {
  text-decoration: none;
  display: inline-block;
  color: #666666;
}

.title :hover {
  text-decoration: underline;
  color: #333333;
}
.title:visited {
  color: #ccc;
}

.authorName,
.commentContent {
  font-weight: bold;
  font-family: shiguang;
  color: black;
}
.authorName {
  text-decoration: none;
  margin: 2% 0 0 0%;
}
.authorName:hover {
  text-decoration: none;
}
.authorName:visited {
  color: black;
}

li > .left_li > div > a {
  width: 20%;
  height: 100%;
  margin-left: 4%;
}
li > .left_li > div > a > img {
  width: 100%;
  height: 100%;
}

li > .left_li > div > .left_content {
  margin-left: 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.articleInfo {
  display: flex;
}
.img_title {
  display: flex;
  width: 100%;
}

.title,
.view_1,
.comments_1,
.type_1,
.lastComment {
  -webkit-font-smoothing: antialiased;
  color: rgb(83, 83, 83);
}
.title span {
  font-size: 1.2rem;
}
.authorName {
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
}
.view_1,
.comments_1,
.type_1,
.lastComment {
  font-size: 13px;
  white-space: nowrap;
  margin-bottom: 4px;
}
.lastComment {
  margin: 10px 10px 8px 10px;
}
.view,
.comments,
.type {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.view {
  margin: 0px 10px;
}
.comments,
.type {
  margin: 0 5%;
}
.viewNum,
.commentNum,
.commentContent {
  font-size: 16px;
}
.replyWrapper {
  display: flex;
  margin-left: 10px;
  align-items: center;
}
.commentContent {
  margin-left: 10px;
}
a {
  text-decoration: none;
}
.img_title .left_content .title span {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
@media screen and (min-width: 577px) and (max-width: 1000px) {
  ul.titleList > li::before {
    display: none;
  }
}
@media screen and (max-width: 577px) {
  .main {
    width: 100%;
  }
  .titleList {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
  }
  .titleList li {
    border: 1px solid rgb(225, 225, 225);
    margin: 2% 1%;
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 15px 4px rgba(51, 51, 51, 0.2);
  }
  ul.titleList > li {
    position: relative;
    padding: 5px 0;
  }
  .img_title {
    align-items: center;
    justify-content: center;
  }
  .authorName {
    margin-bottom: 5px;
    margin-top: 2%;
    text-align: center;
    font-size: 1rem;
  }
  ul.titleList > li {
    position: relative;
    padding: 4px 0;
  }
  .title span {
    font-size: 1rem;
  }
  ul.titleList > li::before {
    display: none;
  }
  .img_title {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img_title > .left_content > a {
    display: none;
  }
  li > .left_li > div > a > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  .right_li {
    flex: 13;
  }
  .left_li {
    flex: 12;
  }
  .view_1,
  .comments_1,
  .type_1,
  .lastComment {
    font-size: 0.8rem;
  }
  .viewNum,
  .commentNum,
  .commentContent {
    font-size: 0.8rem;
  }
  .good,
  .other {
    font-size: 0.6rem;
  }
  .ifshowPagination {
    display: none !important;
  }
}
</style>
