<template>
  <button class="js-back-to-top back-to-top" id="myBtn" title="回到头部" @click="back">︽</button>
</template>

<script>
import $ from "jquery";
export default {
  name: "backToTop",
  mounted() {
    $('.wrapper')[0].onscroll = () => {
      this.showButton();
    };
  },
  methods: {
    back() {
       $('.wrapper').stop().animate({ scrollTop: 0 }, 500, "swing");
    },
    showButton() {
      if (
        $('.wrapper')[0].scrollTop > 50
      ) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.back-to-top {
  display: none;
  /* 默认是隐藏的，这样在第一屏才不显示 */
  position: fixed; /* 位置是固定的 */
  bottom: 10%; /* 显示在页面底部 */
  right: 5%; /* 显示在页面的右边 */
  z-index: 99999; /* 确保不被其他功能覆盖 */
  border: 1px solid #5cb85c; /* 显示边框 */
  outline: none; /* 不显示外框 */
  background-color: rgba(255, 255, 255, 20%); /* 设置背景背景颜色 */
  color: #5cb85c; /* 设置文本颜色 */
  cursor: pointer; /* 鼠标移到按钮上显示手型 */
  padding: 10px 15px 15px 15px!important; /* 增加一些内边距 */
  border-radius: 6px; /* 增加圆角 */
}

/* .back-to-top:hover {
  background-color: #5cb85c; 
  color: #fff;
} */
</style>