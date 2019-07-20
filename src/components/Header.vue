<template>
  <div class="Header">
    <div>
      <router-link :to="{name:'root',params:{page:1,limit:20,tab:'all'}}">
        <img src="../assets/cnodejs_light.svg" alt="logo" class="logo" />
      </router-link>
    </div>
    <div class="menu-toggle" id="menu-toggle" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <ul class="navbar">
      <li>
        <router-link :to="{name:'root',params:{page:1,limit:17,tab:'all'}}">首页</router-link>
        <router-link
          :to="{name:'root',params:{page:1,limit:20,tab: item.tab}}"
          v-for="item in navConfig"
        >{{item.type}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
let navConfig = [
  { tab: "all", type: "全部" },
  { tab: "good", type: "精华" },
  { tab: "share", type: "分享" },
  { tab: "ask", type: "问答" },
  { tab: "job", type: "招聘" }
];
export default {
  name: "Header",
  data() {
    return {
      navConfig,
      hasPostList: true,
      showItem: true,
      tab: "a",
      showNavbar: false
    };
  },
  inject: ["eventBus"],
  watch: {
    $route(from, to) {
      this.eventBus.$on("change", val => {
        this.hasPostList = !val;
      });
    }
  },
  created() {
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
    },
    toggleMenu() {
      let menu = document.querySelector(".menu-toggle");
      let navbar = document.querySelector(".navbar");
      this.showNavbar = !this.showNavbar;
      if (this.showNavbar) {
        menu.classList.add("active");
       navbar.classList.add("active");
      }
      if (!this.showNavbar) {
        menu.classList.remove("active");
        navbar.classList.remove("active");
      }
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
  /* background: rgb(46, 60, 81); */
  background: rgb(17, 17, 17);
  opacity: 0.8;
  display: flex;
}
.Header > div > a {
  margin-left: 10%;
}
.logo {
  width: 120px;
  padding-top: 18px;
  padding-bottom: 18px;
  margin-left: 100%;
}
ul {
  /* margin-right: 15.1%; */
  margin-left: auto;
  margin-right: 10.1%;
}
ul,
li {
  list-style-type: none;
  display: inline-block;
}
li > a {
  font-family: pika, Helvetica, Tahoma, Arial, STXihei, "华文细黑", Heiti,
    "黑体", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", sans-serif;
  font-size: 1.15rem;
  color: rgb(200, 200, 200);
  text-decoration: none;
  cursor: pointer;
  margin: 0 6px;
}
li > a:hover {
  color: #fff;
}
li {
  line-height: 14px;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

@media screen and (max-width: 577px) {
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .menu-toggle {
    width: 3.55rem;
    padding: 0.6rem;
    cursor: pointer;
    /* display: none; */
    position: absolute;
    /* top: -68px; */
    right: 0;
    display: block;
    padding: 0 9px 24px 0;
    z-index: 99999;
  }
  .menu-toggle > div {
    background-color: rgb(200, 200, 200);
  }

  .menu-toggle div {
    /* background-color: #181818; */
    margin: 0.43rem 0.86rem 0.43rem 0;
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.15s ease-in-out;
    transition: 0.15s ease-in-out;
    -webkit-transform-origin: left center;
    -ms-transform-origin: left center;
    transform-origin: left center;
    height: 0.32rem;
  }
  .menu-toggle.active div:nth-child(3) {
    transform: rotate(-45deg);
  }
  .menu-toggle.active div:nth-child(1) {
    transform: rotate(45deg);
  }
  .menu-toggle.active div:nth-child(2) {
    width: 0%;
    opacity: 0;
  }
  .Header {
    /* background: rgb(46, 60, 81); */
    background: rgba(17, 17, 17, 0.5);
    opacity: 0.8;
    display: flex;
    flex-direction: column;
  }
  .Header > div {
    text-align: center;
  }
  .logo {
    width: 120px;
    padding-top: 18px;
    padding-bottom: 18px;
    margin-left: 0;
  }
  ul {
    text-align: center;
    width: 100%;
  }
  ul,
  li {
    list-style-type: none;
    display: inline-block;
  }
  li {
    line-height: 14px;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  li > a {
    font-family: pika, Helvetica, Tahoma, Arial, STXihei, "华文细黑", Heiti,
      "黑体", "Microsoft YaHei", "微软雅黑", SimSun, "宋体", sans-serif;
    font-size: 1.15rem;
    color: rgb(200, 200, 200);
    text-decoration: none;
    cursor: pointer;
    margin: 0 5px;
  }
  li > a:hover {
    color: #fff;
  }
  .menu-toggle {
    position: absolute;
    top: 12px;
    left: 10px;
    outline: none;
  }
  .navbar {
    display: none;
    transition: all 0.5s;
    
  }
  .navbar.active {
    display: block;
  }
}
</style>
