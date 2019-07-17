<template>
  <div id="app">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="3"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>

    <div class="wrapper" ref="main" style="">
      <Header></Header>
      <div class="main" >
        <router-view name="SliderBar"></router-view>
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from "./components/Header";
import PostList from "./components/PostList";
import Article from "./components/Article";
import UserInfo from "./components/UserInfo";
export default {
  name: "App",
  data(){
    return {
    hasPostList: false,
    eventBus: new Vue()
  }},
  provide() {
    return {
      eventBus: this.eventBus
    };
  },
  created(){
//      this.$children.forEach(childVm => {
//      if(childVm.$el.classList.contains("article")) {
// this.$refs.main.style.backgroundColor = 'rgb(62,66,69)'
//      }
//     });
  },
  mounted(){
    this.hasPostList = this.$children.some(childVm => {
      return childVm.$el.classList.contains("PostList")
    });
     this.eventBus.$emit('init',this.hasPostList)

   
  },
   watch: {
    '$route' (from, to) {
      this.hasPostList = this.$children.some(childVm => {
      return childVm.$el.classList.contains("PostList")
    });
     this.eventBus.$emit('change',this.hasPostList)
    },
    },
  components: {
    Header,
    PostList,
    Article,
    UserInfo
  }
};
</script>

<style>
/* .main::-webkit-scrollbar{
display:none;
} */
#app {
  height: 100vh;
  width: 100%;
  /* background: linear-gradient(rgb(81, 165, 193) 0%, rgb(20, 98, 127) 100%); */
  /* background: linear-gradient(rgb(81, 127, 164) 0%, rgb(36, 57, 73) 100%); */
  opacity: 1.2064;
  overflow: hidden;
  background:url(./assets/sky.jpg)
}
.wrapper {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.main {
  height: 100vh;
  width: 80%;
  margin: 0 auto;
}
html {
  width: 100vw;
  height: 100vh;
}
</style>
