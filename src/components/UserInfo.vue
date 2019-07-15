<template>
  <div class="UserInfo">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="information" v-else>
      <section>
        <img :src=" userData.avatar_url" alt>
        <span>{{userData.loginname}}</span>
        <div class="score">{{userData.score}} 积分</div>
        <div class="collect">{{userCollectData.length}}个话题收藏</div>
        <div class="github">
          <i class="iconfont icon-github"></i>
          <a
            :href="`https://github.com/${this.userData.githubUsername}`"
          >@{{this.userData.githubUsername}}</a>
        </div>
        <div>注册时间 {{userData.create_at | formatDate}}</div>
      </section>

      <div class="topics">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="topic in returnFiveTopic">
            <img :src="topic.author.avatar_url" alt>
            <!-- <span>{{topic|InformationFormatter}}</span> -->
            <router-link :to="{name:'post_content',params:{id:topic.id}}">
              <span class="title">{{topic.title}}</span>
            </router-link>
            <span class="last_reply_at">{{topic.last_reply_at | formatDate}}</span>
          </li>
          <!-- <li>查看更多»</li> -->
        </ul>
      </div>
      <div class="replies">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="reply in returnFiveReplies">
            <img :src="reply.author.avatar_url" alt>
            <router-link :to="{name:'post_content',params:{id:reply.id}}">
              <span class="title">{{reply.title}}</span>
            </router-link>
            <span class="last_reply_at">{{reply.last_reply_at | formatDate}}</span>
          </li>
          <!-- <li>查看更多»</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userData: {},
      userCollectData: [],
      replies: [],
      topics: [],
      recieveMessage: {}
    };
  },
  beforeMount: function() {},
  created: function() {
    this.getUserData();
    this.getCollect();
    console.log(1);
    this.$root.bus.$on("transMessage", value => {
      console.log(2);
      this.recieveMessage = value;
      console.log(2)
      console.log(this.recieveMessage);
      console.log(3);
    }),
      (this.isLoading = true);

  },
  methods: {
    getUserData() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.userData = res.data.data;
          this.replies = this.userData.recent_replies;
          this.topics = this.userData.recent_topics;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getCollect() {
      this.$http
        .get(
          `https://cnodejs.org/api/v1/topic_collect/${this.$route.params.name}`
        )
        .then(res => {
          this.isLoading = false;
          this.userCollectData = res.data.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  computed: {
    returnFiveTopic() {
      if (this.topics.length) {
        return this.topics.slice(0, 5);
      }
    },
    returnFiveReplies() {
      if (this.replies.length) {
        return this.replies.slice(0, 5);
      }
    }
  },
  watch: {
    $route(to, from) {
      this.getUserData();
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
  list-style-type: none;
}
ul {
  padding-left: 10px;
}
/* img {
  width: 40px;
} */
.information {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.information section {
  padding: 12px;
}
.information img {
  width: 30px;
}
.information .replies,
.information .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.information > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.information > div > ul > li {
  padding: 9px 0 9px 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  border-top: 1px solid rgb(225, 225, 225);
  display: flex;
  align-items: center;
  /* padding: 10px; */
  position: relative;
  background: white;
  font-size: 16px;
  line-height: 30px;
}
.information > div > ul > li > a {
  color: #08c;
  text-decoration: none;
}
a .title {
  -o-text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
}

a .title {
  overflow: hidden;
  padding-left: 10px;
  padding-right: 10px;
}
a {
  color: #08c;
  text-decoration: none;
}
section > div,
section > span {
  line-height: 17px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 14px;
}
section > :not(.score),
section > .github > a {
  color: #778087;
}
.last_reply_at {
  position: absolute;
  right: 10px;
  color: #778087;
  font-size: 12px;
}
</style>
