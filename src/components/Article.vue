<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <back-to-top></back-to-top>
      <div class="topic_wrapper">
        <div class="topic_header">
          <div class="topic_title">
            <span class="good">{{this.articleData|tabFormatter}}</span>
            <span class="title">{{this.articleData.title}}</span>
          </div>
          <div>
            <ul id="topList">
              <li>•发布于 {{this.articleData.create_at|formatDate}}</li>
              <li>
                •作者
                <router-link :to="{name:'user_Info',params:{name:articleData.author.loginname}}">
                  {{this.articleData.author.loginname}}
                </router-link>
              </li>
              <li>•{{this.articleData.visit_count}}次浏览</li>
              <li class="from_type">•来自{{this.articleData|articleTabFormatter}}</li>
            </ul>
          </div>
          <div class="markdown-body topic_content" v-html="this.articleData.content"></div>
        </div>
      </div>

      <div class="reply">
        <div>
          <svg t="1563374721635" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6376" width="32" height="32"><path d="M511.965867 28.125867c-58.333867 0-113.732267 11.912533-164.6592 32.5632 91.8528 47.9232 154.7264 143.872 154.7264 254.702933 0 26.8288-3.959467 52.701867-10.8544 77.346133 34.850133 63.0784 54.954667 135.441067 54.954667 212.616533 0 114.926933-44.305067 219.272533-116.292267 297.813333 26.658133 5.051733 54.0672 7.918933 82.1248 7.918933 243.848533 0 441.582933-197.666133 441.582933-441.4464C953.5488 225.792 755.8144 28.125867 511.965867 28.125867zM347.306667 60.689067c-61.5424 24.951467-116.394667 62.907733-160.5632 111.104 131.345067 24.746667 241.902933 107.7248 304.401067 220.910933 6.894933-24.644267 10.8544-50.4832 10.8544-77.346133C502.033067 204.561067 439.159467 108.612267 347.306667 60.689067zM491.178667 392.704c-33.792 121.0368-144.5888 209.885867-276.411733 209.885867-47.752533 0-92.706133-11.810133-132.334933-32.4608 39.458133 168.994133 175.7184 300.680533 347.409067 333.0048C501.828267 824.593067 546.133333 720.2816 546.133333 605.320533 546.133333 528.145067 526.0288 455.816533 491.178667 392.704zM491.178667 392.704c-62.498133-113.186133-173.056-196.164267-304.401067-220.910933-71.9872 78.5408-116.258133 182.8864-116.258133 297.847467 0 34.645333 4.369067 68.1984 11.946667 100.488533 39.6288 20.650667 84.5824 32.4608 132.334933 32.4608C346.555733 602.589867 457.352533 513.7408 491.178667 392.704zM418.133333 155.4432c26.624 43.554133 42.222933 94.549333 42.222933 149.333333 0 26.692267-3.925333 52.462933-10.752 76.970667 34.884267 63.1808 54.852267 135.714133 54.852267 212.957867 0 164.522667-90.2144 307.746133-223.6416 383.658667 208.827733-34.986667 368.196267-216.132267 368.196267-434.858667C649.045333 375.978667 555.656533 230.263467 418.133333 155.4432z" p-id="6377" fill="#d81e06"></path></svg>
          <div class="topbar">{{this.replies.length}}回复</div>
        </div>
        <div v-for="(reply,index) in replies" class="replySec" :key="index">
          <div class="replyUp" style="display: flex;">
            <div>
            <router-link :to="{name:'user_Info',params:{name:reply.author.loginname}}" class="imgWrapper">
              <img :src="reply.author.avatar_url" alt @click="handel" />
            </router-link>
            <div style="margin-top:8px;"
                v-if="reply.author.loginname === articleData.author.loginname"
                class="reply_by_author">作者</div>
            </div>
            <div class="replyContent">
              <div class="reply_info">
              <router-link :to="{name:'user_Info',params:{name:reply.author.loginname}}">
                <span @click="handel">{{reply.author.loginname}}</span>
              </router-link>
              <span>{{index+1}}楼</span>
              <span>•{{reply.create_at|formatDate}}</span>
              <span v-if="reply.ups.length>0" class="thumb">
                <i class="iconfont icon-thumbsoup"></i>
                <span>{{reply.ups.length}}</span>
              </span>
           </div>
            <p class="replyContent markdown-body" v-html="reply.content"></p>
          </div>
           </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import "github-markdown-css";
import "./article.css";
import backToTop from './backToTop'
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
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handel() {
      this.$root.bus.$emit("transMessage", this.message);
    }
  },
  components:{
    'back-to-top': backToTop
  }
};
</script>

