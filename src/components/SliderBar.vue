<template>
  <div class="sliderBar">
    <div class="authorDetail">
      <div class="author">
        <div class="img_author">
          <div>
          <router-link :to="{name:'user_Info',params:{name:authorDetails.loginname}}">
            <img :src="authorDetails.avatar_url" alt />
          </router-link>
          </div>
          <div class="authorName">
          <router-link :to="{name:'user_Info',params:{name:authorDetails.loginname}}">
            <span>{{authorDetails.loginname}}</span>
          </router-link>
          </div>
          <div style="margin-top: 8px;display:flex;align-item:center;justify-content:center">
          <svg t="1563431072037" class="icon_coin" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2025" width="32" height="32"><path d="M4.818824 139.745882a343.943529 139.745882 0 1 0 687.887058 0 343.943529 139.745882 0 1 0-687.887058 0Z" p-id="2026"></path><path d="M348.762353 453.571765a778.24 778.24 0 0 0 148.781176-13.854118A355.990588 355.990588 0 0 1 667.407059 368.037647a76.498824 76.498824 0 0 0 27.105882-54.211765V196.367059c-4.818824 75.294118-156.611765 136.131765-343.943529 136.131765S4.818824 269.854118 4.818824 192.752941v120.470588c0 77.703529 154.202353 140.348235 343.943529 140.348236z" p-id="2027"></path><path d="M348.762353 503.567059C159.021176 503.567059 4.818824 440.922353 4.818824 361.411765v120.470588c0 77.101176 154.202353 139.745882 343.943529 139.745882h24.094118a356.592941 356.592941 0 0 1 64.451764-122.88 821.609412 821.609412 0 0 1-88.545882 4.818824z" p-id="2028"></path><path d="M362.616471 674.032941h-13.854118c-190.343529 0-343.943529-60.235294-343.943529-139.745882v120.470588c0 77.101176 154.202353 139.745882 343.943529 139.745882H366.230588a345.148235 345.148235 0 0 1-3.614117-120.470588zM717.402353 421.647059a301.176471 301.176471 0 1 0 301.176471 301.17647 301.176471 301.176471 0 0 0-301.176471-301.17647z m108.423529 312.018823a19.877647 19.877647 0 0 1 0 39.152942h-88.545882v88.545882a19.877647 19.877647 0 0 1-39.152941 0v-90.352941H607.171765a19.877647 19.877647 0 1 1 0-39.152941h90.352941v-39.152942H607.171765a19.877647 19.877647 0 1 1 0-39.152941h46.381176l-42.164706-60.235294a19.877647 19.877647 0 0 1 31.924706-22.889412l60.235294 79.510589h27.105883L787.877647 572.235294a19.877647 19.877647 0 1 1 31.924706 22.889412l-42.164706 60.235294h46.381177a19.877647 19.877647 0 0 1 0 39.152941h-86.738824v39.152941z" p-id="2029"></path></svg>
         <div class="score">{{authorDetails.score}}</div>
         </div>
        </div>
       
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
import fetch_g from "../modules/fetch_g";
import url from "../modules/api";
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
     fetch_g(`${url.userInfo}${this.$route.params.name}`)
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
      fetch_g(url.topics)
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
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
@font-face {
    font-family: "dolly";
    src: url(../../font/dolly-roman.woff.ttf);
  } 
@font-face {
    font-family: "droid";
    src: url(../../font/DroidSansFallbackBold.ttf);
  }
  @font-face {
    font-family: "shiguang";
    src: url(../../font/ShiGuangManManZou-2.ttf);
  } 
  @font-face {
    font-family: "cambo";
    src: url(../../font/Cambo-Regular.otf);
  }
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
  font-size: 18px;
  line-height: 18px;
  padding: 10px;
  color: #444444;
  text-align: center;
  font-family: shiguang;
  font-weight: bold;
}

.img_author {
  padding: 20px 40px;
  display: flex;
flex-direction: column;
}
.img_author>div {
flex:1;
display: flex;
align-items: center;
justify-content: center;
}
.img_author>.authorName {
  padding: 8px 0;
  border-bottom: 1px dashed #aaa;
  font-family: dolly;
  font-size: 1.2rem;
}

.authorDetail img {
  width:90px;
  border-radius: 50%;
}
.author {
  background: white;
  margin-bottom: 12px;
}
a {
  color: #778087;
  text-decoration: none;
}
.score {
  font-size: 16px;
  line-height: 17px;
  padding: 0px 10px 0px;
  font-family: dolly;
  color: #778087;
}

.topicContent > a {
  line-height: 30px;
  color: #778087;
}
.otherTopic > ul,
.noAnswer > ul {
  margin-bottom: 12px;
  padding: 0 10px;
}

.noAnswer {
  margin-top: 10px;
}
.sliderBar {
  float: right;
}
.author,
.otherTopic,
.noAnswer {
  background: #3a3f41 url(../assets/note-bg.jpg);
  overflow: hidden;
  position: relative;
  box-shadow: 0 3px 15px 4px rgba(51, 51, 51, 0.8);
}
.icon_coin {
  width: 1.5em;
  height: 1.5em;
  fill: rgb(255,159,6)
}

.otherTopic li,.noAnswer li {
  font-size: 16px;
  border-bottom: 1px dashed #aaa;
  border-radius: 4px;
  padding: 10px 5px;
  font-family: shiguang;
  transform: all 0.5s;
}
.otherTopic li:first-child,.noAnswer li:first-child{
  border-top: 1px dashed #aaa;
}
.otherTopic li:hover, .noAnswer li:hover {
  box-shadow: 0 3px 15px 3px rgba(51, 51, 51, 0.2);
  transform: scale(1.05);
  transition: all 0.3s;
  background: rgb(245, 245, 245);
  border: none;
}

</style>
