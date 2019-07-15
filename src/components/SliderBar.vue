<template>
  <div class="sliderBar">
    <!-- <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>-->
    <div class="authorDetail">
      <div class="author">
        <div class="authorTitle">作者</div>
        <div class="img_author">
          <router-link :to="{name:'user_Info',params:{name:authorDetails.loginname}}">
            <img :src=" authorDetails.avatar_url" alt>
          </router-link>
          <router-link :to="{name:'user_Info',params:{name:authorDetails.loginname}}">
            <span>{{authorDetails.loginname}}</span>
          </router-link>
        </div>
        <div class="score">积分：{{authorDetails.score}}</div>
      </div>
      <div class="otherTopic">
        <div class="authorTitle">作者其他话题</div>
        <ul>
          <li v-for="topic in returnFiveTopic" class="topicContent">
            <router-link :to="{name:'post_content',params:{id:topic.id}}">{{topic.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="noAnswer">
        <div class="authorTitle">无人回答的问题</div>
        <ul>
          <li v-for="item in fiveTopicWithoutAnswer" class="topicContent">
            <!-- 传入两个参数，一个是进入article组件的id，另一个是获取用户详情的loginname，监听路由 -->
            <router-link
              :to="{name:'post_content',params:{id:item.id,name:item.author.loginname}}"
            >{{item.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderBar",
  data() {
    return {
      isLoading: false,
      authorDetails: {},
      topics: [],
      noAnswer: []
    };
  },
  beforeMount: function() {
    this.isLoading = true;
    this.getAuthorDetails();
    this.topicWithoutAnswer();
  },
  watch: {
    $route(to, from) {
      this.getAuthorDetails();
    }
  },
  computed: {
    returnFiveTopic() {
      if (this.topics.length > 5) {
        return this.topics.slice(0, 5);
      } else {
        return this.topics;
      }
    },
    fiveTopicWithoutAnswer() {
      if (this.noAnswer.length > 5) {
        return this.noAnswer.slice(0, 5);
      } else {
        return this.noAnswer;
      }
    }
  },
  methods: {
    getAuthorDetails() {
      this.$http
        .get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then(res => {
          this.isLoading = false;
          this.authorDetails = res.data.data;
          this.topics = this.authorDetails.recent_topics;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    topicWithoutAnswer() {
      this.$http
        .get("https://cnodejs.org/api/v1/topics")
        .then(res => {
          this.isLoading = false;
          let lists = res.data.data;
          let arr = [];
          //找到没有评论的topic，将对应的topic放到数组中
          lists.forEach(item => {
            if (item.reply_count === 0) {
              arr.push(item);
            }
          });
          this.noAnswer = arr;
          //for(let i=0;i<lists.length;i++){
          // if(lists[i].reply_count===0){
          // arr.push(lists[i])
          // }}
          //this.noAnswer = arr
          // console.log(1)
          // console.log(arr)
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li {
  list-style: none;
}
ul {
  padding-left: 0;
}
li {
  overflow: hidden;
  max-width: 290px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sliderBar {
  width: 290px;
}
.authorTitle {
  background: rgb(246, 246, 246);
  font-size: 13px;
  line-height: 16px;
  padding: 10px;
  color: #444444;
}
.authorDetail img {
  width: 48px;
  margin-right: 10px;
}
.img_author {
  padding: 10px;
  display: flex;
  align-items: center;
}
a {
  color: #778087;
  text-decoration: none;
}
.score {
  font-size: 14px;
  line-height: 17px;
  padding: 0px 10px 5px;
}
.author {
  background: white;
  border: 1px solid rgb(225, 225, 225);
  margin-bottom: 12px;
}
.topicContent > a {
  font-size: 14px;
  line-height: 30px;
  color: #778087;
}
.otherTopic > ul,
.noAnswer > ul {
  margin-bottom: 12px;
  padding: 10px;
  background: white;
}
.otherTopic,
.noAnswer {
  border: 1px solid rgb(225, 225, 225);
}
.sliderBar {
  float: right;
}
</style>
