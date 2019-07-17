<template>
  <div class="Header clearfix">
    <router-link :to="{name:'root',params:{page:1,limit:20,tab:'all'}}">
      <img src="../assets/cnodejs_light.svg" alt="logo" class="logo" />
    </router-link>
    <ul v-show="hasPostList">
      <li>
        <router-link :to="{name:'root',params:{page:1,limit:17}}">首页</router-link>
      </li>
      <li v-for="(item,index) in navConfig" :key="item.type">
        <a @click="changeType($event,index)">{{item.type}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
let navConfig = [
  { type: "全部" },
  { type: "精华" },
  { type: "分享" },
  { type: "问答" },
  { type: "招聘" }
];
export default {
  name: "Header",
  data() {
    return {
      navConfig,
      hasPostList: true,
      showItem: true
    };
  },
  inject: ["eventBus"],
  watch: {
    '$route' (from, to) {
     this.eventBus.$on("change", val => {
      this.hasPostList = !val;
    });
    }
    },
    created(){
      this.eventBus.$on("init", val => {
      this.hasPostList = val;
    }); 
    },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.hasPostList);
    });
  },
  methods: {
    changeType(e, index) {
      e.preventDefault();
      // console.log(index)
      this.$root.bus.$emit("handelType", index);
    }
  }
};
</script>
<style scoped>
@font-face {
  font-family: "shiguang";
  src: url(../../static/ShiGuangManManZou-2.ttf);
}
@font-face {
  font-family: "droid";
  src: url(../../static/DroidSansFallbackBold.ttf);
}
@font-face {
  font-family: "pika";
  src: url(../../static/FangZhengPiKaPiKa-2.ttf);
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.Header {
  /* border:1px solid red; */
  /* background: rgb(68, 68, 68); */
  background: rgb(46, 60, 81);
  opacity: 0.8;
}
.logo {
  width: 120px;
  padding-top: 9px;
  padding-bottom: 9px;
  margin-left: 13%;
}
ul {
  float: right;
  margin-right: 15.1%;
}
ul,
li {
  list-style-type: none;
  display: inline-block;
}

li > a {
  font-family: pika,Helvetica, Tahoma, Arial, STXihei, "华文细黑", Heiti, "黑体",
    "Microsoft YaHei", "微软雅黑", SimSun, "宋体", sans-serif;
  font-size: 1.15rem;
  color: rgb(200, 200, 200);
  text-decoration: none;
  cursor: pointer;
}
li > a:hover {
  color: #fff;
}
li {
  line-height: 14px;
  padding-top: 17px;
  padding-bottom: 17px;
  margin-left: 25px;
}
.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
</style>
