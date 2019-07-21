<template>
  <div class="swiperFather" style="position: relative">
    <div class="swiper-container" :class="thisClass">
      <div class="swiper-wrapper" >
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
    </div>
    <div class="swiper-button-prev swiper-button-white" :class="thisClass"></div>
    <div class="swiper-button-next swiper-button-white" :class="thisClass"></div>
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
  data(){
    return{
      slides: 3
    }
  },
  props: {
    lists: {
      type: Array,
      required: true
    },
    thisClass: {
      type: String|Object,
    }
  },
  created() {
   
  },
  mounted() {
    this.$nextTick(() => {
      new Swiper('.swiper-container'+'.'+ this.thisClass, {
        loop: true, // 循环模式选项
        // autoplay: true, //等同于以下设置
        autoHeight: true,
        uniqueNavElements :false,
        // 如果需要分页器
        navigation: {
          nextEl: '.'+ this.thisClass + ".swiper-button-next",
          prevEl: '.'+ this.thisClass + ".swiper-button-prev"
        },
       slidesPerView :'auto' ,
        spaceBetween: 10,
      });
    });
  },
  data() {
    return {};
  }
};
</script>

<style scoped>

.swiper-container {
  width: 100%;
  height: 100%;
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
.swiper-slide{
    width:300px;/*根据内容调整宽度*/
  }
.swiper-slide img {
  border-radius: 50%;
  width: 20%;
  margin: 10px 0;
}

.img_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title > div {
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
  border-top: 1px dashed rgba(255, 255, 255, 0.4);
}
.title {
  padding: 0 16px;
}
.swiper-button-prev {
  position: absolute;
  left: -27px;
  outline: none;
  transform: scale(0.6);
}
.swiper-button-next {
  position: absolute;
  right: -27px;
  outline: none;
  transform: scale(0.6);
}
@media screen and (max-width: 577px) {
  .article {
    overflow: hidden;
  }
.swiperFather {
  width: 300px;
  height: 250px;
  position: relative;
  margin: 0 auto;
}
.swiper-button-prev {
  position: absolute;
  left: -27px;
  
}
.swiper-button-next {
  position: absolute;
  right: -27px;
}
}

</style>