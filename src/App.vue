<template>
  <div id="app">
    <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push" ></vue-particles>
    <div class="wrapper">
      <Header></Header>
      <div class="main" >
        <router-view name="SliderBar" class="SliderBar" v-if="wideScreen"></router-view>
        <router-view name="main"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import backToTop from './components/backToTop'
import Header from "./components/Header";
import PostList from "./components/PostList";
import Article from "./components/Article";
import UserInfo from "./components/UserInfo";
Vue.component('back-to-top',backToTop)

export default {
  name: "App",
  data(){
    return {
    hasPostList: false,
    wideScreen: true,
  }},
  mounted(){
     window.addEventListener('resize',()=>{
     if(document.documentElement.clientWidth>900){
       console.log('>900')
          this.wideScreen = true
        }
     if(document.documentElement.clientWidth<900){
       console.log('<900')
          this.wideScreen = false
        }
     })
  },
  methods: {
  },
  components: {
    Header,
    PostList,
    Article,
    UserInfo
  }
};
</script>

<style scoped>
#app {
  height: 100vh;
  width: 100%;
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
@media (max-width:900px) {
  .sliderBar_wrapper {
    display: none;
  }
}
 @media screen and (min-width: 300px) and (max-width: 577px) {
.main {
  width: 100%;
}
.SliderBar {
  display: none;
}
 }

</style>
