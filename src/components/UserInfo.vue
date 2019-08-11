<template>
  <div class="UserInfo">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="information" v-else>
      <section>
        <div class="top">
          <div class="userName">{{userData.loginname}}</div>
          <div class="collect">{{userCollectData.length}} 话题收藏</div>
        </div>
        <div class="middle">
          <div class="score">
            <svg t="1563431072037" class="icon_coin" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2025" width="32" height="32" > <path d="M4.818824 139.745882a343.943529 139.745882 0 1 0 687.887058 0 343.943529 139.745882 0 1 0-687.887058 0Z" p-id="2026" /> <path d="M348.762353 453.571765a778.24 778.24 0 0 0 148.781176-13.854118A355.990588 355.990588 0 0 1 667.407059 368.037647a76.498824 76.498824 0 0 0 27.105882-54.211765V196.367059c-4.818824 75.294118-156.611765 136.131765-343.943529 136.131765S4.818824 269.854118 4.818824 192.752941v120.470588c0 77.703529 154.202353 140.348235 343.943529 140.348236z" p-id="2027" /> <path d="M348.762353 503.567059C159.021176 503.567059 4.818824 440.922353 4.818824 361.411765v120.470588c0 77.101176 154.202353 139.745882 343.943529 139.745882h24.094118a356.592941 356.592941 0 0 1 64.451764-122.88 821.609412 821.609412 0 0 1-88.545882 4.818824z" p-id="2028" /> <path d="M362.616471 674.032941h-13.854118c-190.343529 0-343.943529-60.235294-343.943529-139.745882v120.470588c0 77.101176 154.202353 139.745882 343.943529 139.745882H366.230588a345.148235 345.148235 0 0 1-3.614117-120.470588zM717.402353 421.647059a301.176471 301.176471 0 1 0 301.176471 301.17647 301.176471 301.176471 0 0 0-301.176471-301.17647z m108.423529 312.018823a19.877647 19.877647 0 0 1 0 39.152942h-88.545882v88.545882a19.877647 19.877647 0 0 1-39.152941 0v-90.352941H607.171765a19.877647 19.877647 0 1 1 0-39.152941h90.352941v-39.152942H607.171765a19.877647 19.877647 0 1 1 0-39.152941h46.381176l-42.164706-60.235294a19.877647 19.877647 0 0 1 31.924706-22.889412l60.235294 79.510589h27.105883L787.877647 572.235294a19.877647 19.877647 0 1 1 31.924706 22.889412l-42.164706 60.235294h46.381177a19.877647 19.877647 0 0 1 0 39.152941h-86.738824v39.152941z" p-id="2029" /> </svg>
            <div class="scoreNum">{{userData.score}} 积分</div>
          </div>
          <img :src=" userData.avatar_url" alt />
          <div class="github">
            <svg t="1563439449738" class="icon_github" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1976" width="32" height="32" > <path d="M0 520.886c0-69.368 13.51-135.697 40.498-199.02 26.987-63.323 63.322-117.826 109.006-163.51 45.65-45.65 100.154-81.985 163.51-109.006A502.289 502.289 0 0 1 512 8.92c69.335 0 135.663 13.477 198.986 40.497 63.356 26.988 117.86 63.323 163.51 109.007 45.684 45.65 82.02 100.154 109.006 163.51A502.289 502.289 0 0 1 1024 520.852c0 111.318-32.504 211.472-97.511 300.494-64.975 88.989-148.48 150.825-250.484 185.476-5.351 0-9.348-0.99-11.99-2.973-2.676-1.982-4.196-3.997-4.526-6.012a59.458 59.458 0 0 1-0.495-8.984 7.663 7.663 0 0 1-0.991-3.006v-128.99c0-40.63-14.336-75.314-43.008-103.986 76.667-13.345 134.011-41.819 171.999-85.487 37.987-43.669 57.013-96.52 57.013-158.522 0-58.005-18.663-108.346-56.022-150.99 13.345-42.678 11-87.668-6.97-135.003-18.697-1.322-39.011 1.85-61.01 9.513-22 7.663-38.318 14.831-49.02 21.47-10.637 6.673-20.316 13.016-28.97 19.027-38.68-10.669-81.854-16.02-129.486-16.02-47.7 0-90.509 5.351-128.529 16.02-7.333-5.35-15.855-11.164-25.5-17.507-9.68-6.342-26.493-14.005-50.507-22.99-23.982-9.018-45.65-12.85-65.008-11.495-18.663 47.996-20.645 93.646-5.979 136.984-36.665 42.678-54.998 92.986-54.998 150.99 0 62.002 18.663 114.689 55.99 157.994 37.326 43.339 94.67 72.01 171.998 86.016a142.303 142.303 0 0 0-39.969 70.029c-56.683 13.972-96.355 3.963-119.015-30.06-42.017-61.308-79.674-83.307-113.003-65.965-4.69 4.657-3.997 9.48 1.982 14.501 6.012 4.988 14.996 11.66 27.02 19.985 11.99 8.357 20.976 17.507 26.987 27.515 0.661 1.322 2.51 6.177 5.517 14.502a831.917 831.917 0 0 0 8.985 23.981c2.973 7.663 8.654 16.186 17.011 25.5 8.324 9.349 18.003 17.178 29.003 23.52 11 6.309 26.161 11 45.485 14.006 19.324 2.972 41.323 3.138 65.998 0.495v100.484c0 0.991-0.165 2.643-0.495 5.021-0.33 2.312-0.991 3.964-1.982 4.955-0.991 1.024-2.345 2.015-4.03 3.039a12.52 12.52 0 0 1-6.474 1.486c-2.676 0-6.012-0.33-10.009-0.99-101.343-35.345-183.825-97.182-247.51-185.51C31.842 731.037 0 631.577 0 520.92z" p-id="1977" /> </svg>
            <div class="githubAddress">
              <a :href="`https://github.com/${this.userData.githubUsername}`">@{{this.userData.githubUsername}}</a>
            </div>
          </div>
        </div>
        <div class="loginTime">注册时间 {{userData.create_at | formatDate}}</div>
      </section>
      
      <div style="width:80%;margin: 0 auto;" v-if="returnFiveTopic">
      <p class="topicsRecent">最近创建的话题</p>
        <swiper :lists="returnFiveTopic" ref="1" thisClass="topics1"></swiper>
      </div>

      <div class="replyWrapper" v-if="returnFiveReplies">
         <p  class="replies">最近参与的话题</p>
        <swiper :lists="returnFiveReplies" ref="2" thisClass="replies1"></swiper>
      </div>
      <back-to-top></back-to-top>
    </div>
  </div>
</template>

<script>
import swiper from "./swiper";
import fetch_g from "../modules/fetch_g";
import url from "../modules/api";

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
  components: {
    swiper
  },
  beforeMount: function() {},
  created() {
    this.getUserData();
    this.getCollect();
    this.$root.bus.$on("transMessage", value => {
      this.recieveMessage = value;
      console.log(this.recieveMessage);
    }),
      (this.isLoading = true);
  },
  methods: {
    getUserData() {
      fetch_g(`${url.userInfo}${this.$route.params.name}`)
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
        fetch_g(
          `${url.collect}${this.$route.params.name}`
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
        return this.topics
      }
    },
    returnFiveReplies() {
      if (this.replies.length) {
        return this.replies
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
.information {
  width: 100%;
  margin: 10px auto;
}
.information section {
  background: rgba(0, 0, 0, 0.5);
  padding: 5%;
  width: 40%;
  margin: 0px auto;
}
.information section > .top {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.topicsRecent, .replies {
  font-size: 2rem;
  font-weight: bold;
  font-family: shiguang;
  color: rgb(180, 180, 180);
}
.information section .userName{
  font-size: 4rem;
  font-weight: bold;
  font-family: cambo;
  color: rgb(180, 180, 180);
}
.information section .collect {
  font-size: 1.8rem;
  font-family: shiguang;
  color: rgb(156, 156, 156);
}
.information section img {
  width: 25%;
  border-radius: 50%;
  margin: 0 15%;
}
.middle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5%;
}
.loginTime {
  text-align: right;
  font-family: shiguang;
  color: rgb(156, 156, 156);
}

.github,
.score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.github > .icon_github,
.score > .icon_coin {
  width: 100%;
  height: 100%;
}
.github > .githubAddress,
.score > .scoreNum {
  font-family: shiguang;
  font-size: 1.2em;
  margin: 10px 0;
  color: rgb(156, 156, 156);
}
.score > .icon_coin {
  fill: rgb(255, 159, 6);
}

@media screen and (max-width: 577px) {
.information section .userName{
  font-size: 1.5rem;
}
.information section {
  width: 80%;
}
.information section .collect {
  font-size: 1.2rem;
}
.github > .icon_github,
.score > .icon_coin {
  width: 1.2em;
  height: 1.2em;
}
.github > .icon_github{
  fill: white;
}
.github > .githubAddress,
.score > .scoreNum {
  white-space: nowrap;
  font-size: 1rem;
}
.information section img {
  width: 26%;
  border-radius: 50%;
  margin: 0 15%;
}
.loginTime {
  font-size: 1rem
}
.replyWrapper {
  width:80%; 
  margin: 5% auto;
}
.topicsRecent, .replies {
  font-size: 1.5rem!important;
}
}
@media screen and (min-width: 577px) and (max-width: 1000px) {
  .top > .userName {
    font-size: 2rem!important;
  }
  .top > .collect {
    font-size: 1.5rem!important;
  }
  .score .scoreNum {
    white-space: nowrap;
  }
  
}
</style>
