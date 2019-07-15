<template>
  <div class="pagination">
    <!-- 当需要参数的方法不传递参数时，它传递的是原生的event对象 -->
    <button @click="changePage">首页</button>
    <button @click="changePage">上一页</button>
    <button v-if="this.currentPage>=5" class="pagebtn">......</button>
    <!-- 当页码为为当前页码时，就显示当前页码的样式 -->
    <!-- 注意要将当前page传递给方法 -->
    <button
      v-for="page in pages"
      @click="changePage(page)"
      :class="[{currentPage: page == currentPage},'pagebtn']"
    >{{page}}</button>
    <button @click="changePage">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: "Pagination",
  data() {
    return {
      pages: [1, 2, 3, 4, 5, "......"],
      currentPage: 1 ,//当前选中的页码
    };
  },//123456...
  methods: {
    changePage(page) {
      if(typeof page != 'number'){
        switch(page.target.innerText){
          case '上一页':
          $('.currentPage').ready().prev().click()
          break
          case '下一页':
          $('.currentPage').ready().next().click()
          break
          case '首页':
          this.pages = [1, 2, 3, 4, 5, "......"]
          this.changePage(1)
          break
          default:
          break
        }
        return
      }
      this.currentPage = page;
      if(page==this.pages[4]){
        //移除第一项
        this.pages.shift()
        //移除第一项后，在5的后面，也就是第4个位置上加上一个页码，数字为前一个数字加1
        this.pages.splice(4,0,this.pages[3]+1)
      }else if(page==this.pages[0] && page !==1){
      // 如果页码时数组的的第一项，那么只要页码不是1，就在数组第一项加上页码为当前数组第0项页码减1，并且删除数组第五项上
       var lastPage = this.pages[0]-1
       this.pages.unshift(lastPage)
       this.pages.splice(5,1)
      }
      this.$emit('handel',this.currentPage)
      console.log(this.currentPage)
    }
  }
};
</script>

<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  /*box-shadow: 0px 2px 9px #888888;*/
  border: 1px solid #888888;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}

.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}

.currentPage {
  color: white;
  background-color: #1f1b1b;
}
</style>
