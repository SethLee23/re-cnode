import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo  from '../components/UserInfo';
import SliderBar from '../components/SliderBar'
export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main:PostList
      }
    },
    {
      path:'/topic/:id &author=:name',
      name:'post_content',
      components:{
        main:Article,
        SliderBar:SliderBar
      }
    },
    {
      path:'/user/:name',
      name:'user_Info',
      components:{
      main:UserInfo
      }
    }
  ]
})
