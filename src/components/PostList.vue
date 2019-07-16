<template>
  <div class="PostList">

    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>

    <div class="lists" v-else>
      <ul class="titleList">
        <li v-for="list in lists" v-if="list.last_reply">
          <div  class="left_li">
            <div class="img_title">
              <img :src="list.author.avatar_url" alt />
              <div style="border:1px solid gold" class="left_content">
                <div class="authorName" style="margin:5% 0;">{{list.author.loginname}}</div>
                <div class="title">{{list.title}}</div>
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
               <div :class="[{good:(list.good==true||list.top==true)},{other:(list.good!=true&&list.top!=true)}]">
                 {{list|tabFormatter}}
               </div>
             </div>
             </div>
           <div class="replies" >
             <div class="lastComment">最近评论</div>
            <!-- <div>
              </div -->
              <div style="display:flex;margin-left: 10px">
                <div><img :src="list.last_reply.author.avatar_url" style="width:40px;height: 40px;"/></div>
                <div class="commentContent" >{{list.last_reply.author.loginname}}</div>
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
import "github-markdown-css";
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
        params: { page: this.page, limit: 17, tab: this.tab }
      }).then(res => {
        let list = res.data.data;
        let arr = []
      //  Promise.all(
          list.map((item, index) => {
             fetch_g(`${url.article}${item.id}`).then(res => {
              let len = res.data.data.replies.length;
              // 添加属性
              arr.push(Object.assign({},item,{last_reply:res.data.data.replies[len - 1]}))
            });
          })
        // );
        console.log(arr)
        this.lists = arr
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
  display:flex;
  flex:1;
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
// .titleList > li > img {
//   width: 30px;
// }
.PostList {
  margin-top: 14px;
}
// .allCount {
//   font-size: 12px;
//   width: 70px;
//   text-align: center;
// }
// .reply_count {
//   color: rgb(158, 120, 192);
//   font-size: 14px;
// }
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
}
li {
  border-top: 1px solid rgb(225, 225, 225);
  // display: flex;
  // align-items: center;
  margin: 2% 10%;
  // padding: 2% 0;
  // position: relative;
  background: white;
  border: 1px solid black;
  border-radius: 4px;
}
.right_li {
  flex:1;
  border:1px solid red;
  display: flex;
  flex-direction: column;
  padding: 5px 5px;
} 
.left_li {
  flex:1;
  display: flex;
  align-items: center;
width: 100%;
}
li:hover {
  background: rgb(245, 245, 245);
}
.last_reply_at {
  position: absolute;
  right: 10px;
  color: #778087;
  font-size: 12px;
}

a:focus,
a:hover {
  color: #005580;
  text-decoration: underline;
}
a:active,
a:hover {
  outline: 0;
}
a {
  text-decoration: none;
  color: black;
  max-width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  font-size: 16px;
  line-height: 30px;
  margin-left: 5px;
  color: #333333;
}

a:hover {
  text-decoration: underline;
  color: #333333;
}
a:visited {
  color: #888888;
}
.topbar {
  height: 40px;
  background-color: #f5f5f5;
}

.topbar > span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
  display: inline-block;
}

.toobar span:hover {
  color: #9e78c0;
}
/*重写 css*/
li > .left_li > div > img {
  width: 30%;
  height: 100%;
  margin-left: 3%;
  border: 1px solid pink;
}

ul > li  {
  position: relative;
  padding: 10px 0;
}
li > .left_li > div > .left_content {
  margin-left: 10%;
  flex: 1;
  display: flex;
  flex-direction: column;
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
}
ul > li:nth-child(2n)::before {
  background: #dcb239;
}
ul > li:nth-child(3n)::before {
  background: #fedcd2;
}
ul > li:nth-child(4n)::before {
  background: #df744a;
}
.commentContent, title {
overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.articleInfo {
  display: flex; 
  border: 1px solid green;
}
.img_title {
  border: 1px solid green;
  display: flex;
  width: 100%;
    // justify-content: center;
    // align-items: center;
}
.title,.view_1,.comments_1,.type_1, .lastComment {
  -webkit-font-smoothing: antialiased;
  color: rgb(83,83,83);
  font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}
.title {
  font-size: 16px;
}
.authorName {
  -webkit-font-smoothing: antialiased;
  font-weight:bolder;
  font-size:20px;
  font-family:"宋体","Courier New",sans-serif,"Times New Roman","Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;;
  // color: rgb(77,77,77);
// margin: 10px 0px;
}
.view_1,.comments_1,.type_1,.lastComment {
font-size: 14px;
white-space: nowrap;
}
.lastComment {
  margin: 10px 10px;
}
.view,.comments,.type {
border: 1px solid pink;
display: flex;
justify-content:center;
align-items: center;
flex-direction: column;
}
.view{
  margin: 0px 10px;
}
.comments,.type {
   margin: 0 10px;
}
.viewNum,.commentNum{
font-size: 16px;
}
</style>
