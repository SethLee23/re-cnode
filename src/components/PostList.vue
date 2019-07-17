<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="lists" v-else>
      <ul class="titleList">
        <li v-for="list in lists" v-if="list.last_reply">
          <div class="left_li">
            <div class="img_title">
              <router-link
                :to="{
        name:'user_Info',
        params:{
          name:list.author.loginname
        }}"
              >
                <img :src="list.author.avatar_url" alt />
              </router-link>
              <div class="left_content">
                <!-- <div> -->
                  <router-link
                   class="authorName" style="margin:5% 0 0 0%;"
                    :to="{
        name:'user_Info',
        params:{
          name:list.author.loginname
        }}">{{list.author.loginname}}</router-link>
                <!-- </div> -->
                <!-- <div > -->
                <router-link
                  class="title"
                  style="flex:1;display:flex;align-items:center"
                  :to="{
        name:'post_content',
        params:{
          id:list.id,
          name:list.author.loginname
        }}"
                >{{list.title}}</router-link>
                <!-- </div> -->
              </div>
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
              <!-- <div>
              </div-->
              <div class="replyWrapper">
                <div>
                  <img
                    :src="list.last_reply.author.avatar_url"
                    style="width:40px;height: 40px;border-radius:50%;"
                  />
                </div>
                <div class="commentContent">{{list.last_reply.author.loginname}}</div>
                <div class="last_reply_at">{{list.last_reply_at|formatDate}}</div>
              </div>
            </div>
          </div>

          <!-- 动态绑定属性：src,注意key -->
          <!-- <img :src="list.author.avatar_url" alt />
          <span class="allCount">
            <span class="reply_count">{{list.reply_count}}</span>
            /{{list.visit_count}}
          </span>
          <span
            :class="[{good:(list.good==true||list.top==true)},{other:(list.good!=true&&list.top!=true)}]"
          >{{list|tabFormatter}}</span>
          <router-link
            :to="{
        name:'post_content',
        params:{
          id:list.id,
          name:list.author.loginname
        }}"
          >
            <span class="topic_title">{{list.title}}</span>
          </router-link>
          <span class="last_reply_at">{{list.last_reply_at|formatDate}}</span>-->
        </li>
      </ul>
    </div>
    <Pagination @handel="changePage"></Pagination>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import fetch_g from "../modules/fetch_g";
import url from "../modules/api";

export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      lists: {},
      page: 1,
      tab: ""
    };
  },
  components: {
    Pagination
  },
  created: function() {
    this.isLoading = true;
    this.getPostList();
  },
  mounted() {
    this.$root.bus.$on("handelType", index => {
      console.log(index);
      this.changeTab(index);
      this.getPostList();
    });
  },
  methods: {
    getPostList() {
      fetch_g(url.topics, {
        params: { page: this.page, limit: 10, tab: this.tab }
      }).then(res => {
        let list = res.data.data;
        let arr = [];
        //  Promise.all(
        list.map((item, index) => {
          fetch_g(`${url.article}${item.id}`).then(res => {
            let len = res.data.data.replies.length;
            // 添加属性
            arr.push(
              Object.assign({}, item, {
                last_reply: res.data.data.replies[len - 1]
              })
            );
          });
        });
        // );
        console.log(arr);
        this.lists = arr;
        this.isLoading = false;
      });
    },

    changePage(value) {
      console.log("传入page");
      this.page = value;
      this.getPostList();
    },
    changeTab(index) {
      switch (index) {
        case 0:
          this.tab = "all";
          break;
        case 1:
          this.tab = "good";
          break;
        case 2:
          this.tab = "share";
          break;
        case 3:
          this.tab = "ask";
          break;
        case 4:
          this.tab = "job";
          break;
      }
      return;
    }
  }
};
</script>


<style lang="less" scoped>
@font-face {
  font-family: "dolly";
  src: url(../../static/dolly-roman.woff.ttf);
}
@font-face {
  font-family: "droid";
  src: url(../../static/DroidSansFallbackBold.ttf);
}
@font-face {
  font-family: "yuan";
  src: url(../../static/ErZiYuanPangTouYuJian-2.ttf);
}
@font-face {
  font-family: "pika";
  src: url(../../static/FangZhengPiKaPiKa-2.ttf);
}
@font-face {
  font-family: "hezi";
  src: url(../../static/HeZi-TingBuDao-2.ttf);
}
@font-face {
  font-family: "shiguang";
  src: url(../../static/ShiGuangManManZou-2.ttf);
}
@font-face {
  font-family: "wenyue";
  src: url(../../static/WenYueGuTiFangSong-2.ttf);
}
@font-face {
  font-family: "cambo";
  src: url(../../static/Cambo-Regular.otf);
}
//font-family
.lastComment,
.view_1,
.comments_1,
.type_1 {
  font-family: droid;
}
.title,
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
}

.PostList {
  margin-top: 14px;
}
.good,
.other {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  border-radius: 3px;
  color: #fff;
}
.good {
  background: #80bd01;
}
.other {
  background: #999999;
}
ul {
  background: white;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 4px;
}
li {
  border: 1px solid rgb(225, 225, 225);
  margin: 2% 10%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 3px 15px 4px rgba(51, 51, 51, 0.2);
}
ul > li {
  position: relative;
  padding: 10px 0;
}
ul > li::before {
  content: "";
  width: 3px;
  position: absolute;
  left: 5px;
  top: 2.5%;
  height: 95%;
  border-radius: 2px;
}
ul > li:nth-child(n)::before {
  background: #bfdbd2;
  opacity: 0.8;
}
ul > li:nth-child(2n)::before {
  background: #dcb239;
  opacity: 0.6;
}
ul > li:nth-child(3n)::before {
  background: #fedcd2;
}
ul > li:nth-child(4n)::before {
  background: #df744a;
  opacity: 0.6;
}
ul > li:hover::before {
  opacity: 1;
}
li:hover {
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
  // text-decoration: underline;
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

.title:hover {
  text-decoration: underline;
  color: #333333;
}
.title:visited {
  color: #888888;
}

.authorName,
.commentContent {
  font-weight: bold;
  font-family: shiguang;
  color: black;
  
}
.authorName{
  text-decoration: none;
}
.authorName:hover{
  text-decoration: none;
}
.authorName:visited {
  color: black;
}

li > .left_li > div > a {
  width: 30%;
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

title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
.title {
  font-size: 1.2rem;
}
.authorName {
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
}
.view_1,
.comments_1,
.type_1,
.lastComment {
  font-size: 14px;
  white-space: nowrap;
  margin-bottom: 5px;
}
.lastComment {
  margin: 10px 10px 5px 10px;
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
  // font-family: "宋体", "Courier New", sans-serif, "Times New Roman",
  //   "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB",
  //   "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  // font-weight: bold;
}
.replyWrapper {
  display: flex;
  margin-left: 10px;
  align-items: center;
}
.commentContent {
  margin-left: 10px;
}
</style>
