import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import './icon/style.css'
import axios from 'axios'
 
// import 'github-markdown.css'
Vue.prototype.$http = axios
Vue.config.productionTip = false
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
import store from './store/index'
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data:{
    bus:new Vue()
  },
  mounted(){
    
  }
})
Vue.filter('formatDate', function (str) {
  if (!str) return ''
  var date = new Date(str)
  //getTime()方法返回1970.1.1距离该日期对象的毫秒数
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'//1000ms 1s
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'//60*1000 1min
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'//60*60*1000 1h
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'//60*60*1000*24
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'//60*60*1000*24*30
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
}
)
//处理显示板块的文字
Vue.filter('tabFormatter',function (post) {
if(post.good == true){
  return '精华'
}else if(post.top == true){
  return '置顶'
}else if(post.tab == 'ask'){
  return '问答'
}else if(post.tab == 'share'){
  return '分享'
}else{
  return '招聘'
}
})
//处理文章内格式
Vue.filter('articleTabFormatter',function (post) {
  if(post.good == true){
    return '精华'
  }else if(post.tab == 'ask'){
    return '问答'
  }else if(post.tab == 'share'){
    return '分享'
  }else{
    return '招聘'
  }
  })
  Vue.filter('InformationFormatter',function (post) {
    if(post.top == true){
      return '置顶'
    }else if(post.good == true){
      return '精华'
    }
    })