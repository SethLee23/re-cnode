import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import url from '../modules/api'
import fetch_g from '../modules/fetch_g'

const store = new Vuex.Store({
  state: {
    lists: null,
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    replyList(state, instance) {
      // state.lists.forEach(item => {
      //     item.lastReplyContent = instance
      // });
    },
  },
  actions: {
    getList({commit},data) {
        fetch_g(url.topics,data,()=>{console.log(22222)})
        .then(res => {
        let lists = res.data.data
        console.log(lists)
        lists.forEach((item)=>{
          item.lastReplyContent = ''
        })
        console.log(lists)
        commit('init', lists)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addReply(context,data) {
      console.log("context.state.lists")
      console.log(context.state.lists)
      // context.state.lists.forEach(item => {
      //   fetch_g(`${url.topics}/:${item.id}`)
      //   .then(res => {
      //   let replylist = res.data.data.replyes
      //   console.log(replylist)
      //   // commit('replyList', replylist)
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // })
        
    },
}

})

export default store
