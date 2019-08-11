<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div
      class="lists"
      v-else
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loadingMore"
      infinite-scroll-distance="10"
    >
      <post-item :lists="lists"></post-item>
      <div class="loading-more" v-show="loadingMore">
        <span></span>
      </div>
    </div>
    <back-to-top></back-to-top>
    <Pagination @handel="changePage" class="ifshowPagination"></Pagination>
  </div>
  <!-- -->
</template>

<script>
import Vue from "vue";
import Pagination from "./Pagination";
import postListItem from "./postListItem";
import fetch_g from "../modules/fetch_g";
import url from "../modules/api";
import { InfiniteScroll } from "mint-ui";
Vue.use(InfiniteScroll);
export default {
  name: "PostList",
  data() {
    return {
      isLoading: false,
      lists: {},
      page: 1,
      loadingMore: false,
      allLoaded: false,
      limit: 15,
      tab: ""
    };
  },
  components: {
    Pagination,
    "post-item": postListItem
  },
  beforeMount() {},
  created() {
    this.isLoading = true;
    this.getPostList();
  },
  mounted() {},
  watch: {
    $route(from, to) {
      this.getPostList();
    }
  },
  methods: {
    loadMore() {
      if (window.ontouchstart === null) {
        if (this.allLoaded) return;
        this.loadingMore = true;
        this.getPostList();
      } else {
        this.loadingMore = false;
        return;
      }
    },
    mobileList(arr) {
      let that = this;
      //当获取的数组的长度等于请求数据的条数时，才开始判断
      if (arr.length == this.limit) {
        if (arr.length < this.limit) {
          that.allLoaded = true;
        }
        if (that.lists.length && arr[0].tabs === that.lists[0].tabs) {
          that.lists = that.lists.concat(arr);
        } else {
          that.lists = arr;
        }
        this.loadingMore = false;
        this.page++;
      }
    },
    getPostList() {
      let that = this;
      fetch_g(url.topics, {
        params: {
          page: this.page,
          limit: this.limit,
          tab: this.$route.params.tab
        }
      }).then(res => {
        let list = res.data.data;
        let arr = [];
        if (window.ontouchstart === null) {
          list.map((item, index) => {
            fetch_g(`${url.article}${item.id}`).then(res => {
              let len = res.data.data.replies.length;
              // 添加属性
              arr.push(
                Object.assign({}, item, {
                  last_reply: res.data.data.replies[len - 1],
                  tabs: this.$route.params.tab
                })
              );
              this.mobileList(arr);
            });
          });
        }
        if (window.ontouchstart === undefined) {
          list.map((item, index) => {
            fetch_g(`${url.article}${item.id}`).then(res => {
              let len = res.data.data.replies.length;
              // 添加属性
              arr.push(
                Object.assign({}, item, {
                  last_reply: res.data.data.replies[len - 1],
                  tabs: this.$route.params.tab
                })
              );
            });
          });
          this.lists = arr;
        }
        this.isLoading = false;
      });
    },
    changePage(value) {
      console.log("传入page");
      this.page = value;
      this.getPostList();
    }
  }
};
</script>


<style lang="less" scoped>
.loading-more {
  width: 100%;
  padding: 20px 10px;
  vertical-align: middle;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 20px;
  box-sizing: border-box;
}
.loading-more span {
  display: inline-block;
  margin-top: 10px;
  width: 16px;
  height: 16px;
  background: url(https://b.yzcdn.cn/v2/image/loader.gif) no-repeat 50%;
  background-size: 16px 16px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min--moz-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  .loading-more span {
    background-image: url(https://b.yzcdn.cn/v2/image/loader@2x.gif);
  }
}
@media screen and (min-width: 577px) and (max-width: 1000px) {
  ul.titleList > li::before {
    display: none;
  }
}
@media screen and (max-width: 577px) {
  .main {
    width: 100%;
  }
  .titleList {
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
  }
  .titleList li {
    border: 1px solid rgb(225, 225, 225);
    margin: 2% 1%;
    background: white;
    border-radius: 4px;
    box-shadow: 0 3px 15px 4px rgba(51, 51, 51, 0.2);
  }
  ul.titleList > li {
    position: relative;
    padding: 5px 0;
  }
  .img_title {
    align-items: center;
    justify-content: center;
  }
  .authorName {
    margin-bottom: 5px;
    margin-top: 2%;
    text-align: center;
    font-size: 1rem;
  }
  ul.titleList > li {
    position: relative;
    padding: 4px 0;
  }
  .title span {
    font-size: 1rem;
  }
  ul.titleList > li::before {
    display: none;
  }
  .img_title {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .img_title > .left_content > a {
    display: none;
  }
  li > .left_li > div > a > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #ddd;
  }
  .right_li {
    flex: 13;
  }
  .left_li {
    flex: 12;
  }
  .view_1,
  .comments_1,
  .type_1,
  .lastComment {
    font-size: 0.8rem;
  }
  .viewNum,
  .commentNum,
  .commentContent {
    font-size: 0.8rem;
  }
  .good,
  .other {
    font-size: 0.6rem;
  }
  .ifshowPagination {
    display: none !important;
  }
}
</style>