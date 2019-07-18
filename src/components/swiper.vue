<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <div class="xxx">
          <div class="img_wrapper">
            <img :src="list.author.avatar_url" alt />
            <span class="last_reply_at">{{list.last_reply_at | formatDate}}</span>
          </div>
          <div class="listInfo">{{list|InformationFormatter}}</div>
          <router-link :to="{name:'post_content',params:{id:list.id}}">
            <div class="title">
              <div>{{list.title}}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev swiper-button-white"></div>
    <div class="swiper-button-next swiper-button-white"></div>
  </div>
</template>

<script>
// swiper-button-prev
//  swiper-button-next
import Swiper from "swiper";
import "swiper/dist/css/swiper.css";
import "../assets/svg.js";
export default {
  name: "Swiper",
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      new Swiper(".swiper-container", {
        loop: true, // 循环模式选项
        // autoplay: true, //等同于以下设置
        autoHeight: true,
        // 如果需要分页器
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 30
        // slidesOffsetBefore: 100
        // slidesOffsetAfter : 100,
      });
    });
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.swiper-container {
  width: 100%;
  height: 100%;
  position: relative;
  font-family: shiguang;
}
.xxx {
  width: 100%;
  height: 225px;
  background: rgba(0, 0, 0, 0.6);
  color: rgb(156, 156, 156);
  display: flex;
  flex-direction: column;
}
.swiper-slide img {
  border-radius: 50%;
  width: 20%;
  margin: 10px 0;
}

.swiper-button-prev.swiper-button-next {
  top: 40%;
  bottom: auto;
  position: absolute;
}
.img_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title> div{
display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  padding-top: 8px; 
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  border-top: 1px dashed rgba(255,255,255,0.4);
}
.title {
  padding: 0 16px;
}
</style>