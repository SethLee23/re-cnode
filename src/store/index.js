import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)



const store = new Vuex.Store({
  state: {
    list: null,
  },
  mutations: {
    init(state, list) {
      state.list = list
    },
    replyList(state, instance) {
      state.list.forEach(element => {
          element.lastReplyContent = instance
      });
    },
   
    
  },
  actions: {
    getList({commit},data) {
        this.$http
        .get("https://cnodejs.org/api/v1/topics", {
          params: { page: data.page, limit: data.limit, tab: data.tab }
        })
        .then(res => {
        //   this.isLoading = false;
        let list = res.data.lists
        list.lastReplyContent = ''
        commit('init', list)
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // addReply({commit},data) {
    //     this.$http
    //     .get(`https://cnodejs.org/api/v1/topics/:${id}`)
    //     .then(res => {
    //     let list = res.data.data.replyes
    //     list.lastReplyContent = ''
    //     commit('init', list)
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
}

})

export default store
