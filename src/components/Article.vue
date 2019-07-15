<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="topic_header" v-else>
      <div class="topic_title">
        <span class="good">{{this.articleData|tabFormatter}}</span>
        <span class="title">{{this.articleData.title}}</span>
      </div>
      <div>
        <ul>
          <li>•发布于 {{this.articleData.create_at|formatDate}}</li>
          <li>
            •作者
            <router-link
              :to="{name:'user_Info',params:{name:articleData.author.loginname}}"
            >{{this.articleData.author.loginname}}</router-link>
          </li>

          <li>•{{this.articleData.visit_count}}次浏览</li>
          <li>•来自{{this.articleData|articleTabFormatter}}</li>
        </ul>
      </div>
      <div class="markdown-body topic_content" v-html="this.articleData.content"></div>
      <div class="reply">
        <div class="topbar">{{this.replies.length}}回复</div>

        <div v-for="(reply,index) in replies" class="replySec">
          <div class="replyUp">
            <router-link :to="{name:'user_Info',params:{name:reply.author.loginname}}">
              <img :src="reply.author.avatar_url" alt @click="handel">
            </router-link>

            <router-link :to="{name:'user_Info',params:{name:reply.author.loginname}}">
              <span @click="handel">{{reply.author.loginname}}</span>
            </router-link>
            <span>{{index+1}}楼</span>
            <span>•{{reply.create_at|formatDate}}</span>
            <span
              v-if="reply.author.loginname === articleData.author.loginname"
              class="reply_by_author"
            >作者</span>
            <span v-if="reply.ups.length>0" class="thumb">
              <i class="iconfont icon-thumbsoup"></i>
              <span>{{reply.ups.length}}</span>
            </span>
            <span v-else></span>
          </div>
          <p class="replyContent markdown-body" v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "github-markdown-css";
export default {
  name: "Article",
  data() {
    return {
      isLoading: false,
      articleData: {},
      replies: [],
      message: {}
    };
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
    }
  },
  methods: {
    getArticleData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then(res => {
          this.isLoading = false;
          this.articleData = res.data.data;
          this.replies = this.articleData.replies;
            // let len = this.replies.length;
            // this.message.good = this.articleData.good;
            // this.message.top = this.articleData.top;
            // this.message.reply_count = this.articleData.reply_count;
            // this.message.visit_count = this.articleData.visit_count;
            // this.message.lastReply = this.replies[len - 1].author.avatar_url;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    handel() {
      this.$root.bus.$emit("transMessage", this.message);
    }
  }
};
</script>

<style scoped>
.loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
ul,
li {
  list-style-type: none !important;
}
.replyUp > img {
  width: 30px;
}
.thumb {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
}
.title {
  font-size: 22px;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 315px;
  margin-top: 15px;
}

.reply,
.topic_header {
  background-color: #fff;
}

.reply {
  margin-top: 15px;
}

.reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

.reply a,
.reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-body img {
  width: 92% !important;
}
.good {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
}

a {
  text-decoration: none;
  display: inline-block;
  color: #838383;
}
a:hover {
  text-decoration: underline;
}
.markdown-body a {
  color: #0088cc !important;
}
span.reply_by_author {
  color: #fff;
  background-color: #6ba44e;
  padding: 2px;
  font-size: 12px;
}
</style>
