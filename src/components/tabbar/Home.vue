<template>
  <div class='home'>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item) in lunboList" :key="item.id">
        <img :src="item.img" alt="" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newlist">
            <!-- <div style='width:60px; height:60px' class='tianchong'></div> -->
            <img src="http://192.168.43.23:3000/images/1.jpg" />
            <div class="mui-media-body">新闻资讯</div></router-link
          >
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/share">
            <img src="http://192.168.43.23:3000/images/2.jpg" />
            <div class="mui-media-body">图片分享</div></router-link
          >
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
            <img src="http://192.168.43.23:3000/images/3.jpg" />
            <div class="mui-media-body">商品购买</div></router-link
          >
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="http://192.168.43.23:3000/images/4.jpg" />
            <div class="mui-media-body">留言反馈</div></a
          >
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="http://192.168.43.23:3000/images/5.jpg" />
            <div class="mui-media-body">视频专区</div></a
          >
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="http://192.168.43.23:3000/images/6.jpg" />
            <div class="mui-media-body">联系我们</div></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunboList: [],
      img: require("../../images/1.jpg")
    };
  },
  methods: {
    getLunbo() {
      this.$http
        .get("http://192.168.43.23:3000/js/data.json")
        .then(res => {
          console.log(res)
          if (res.status == 200) {
            
            this.lunboList = res.data;
            console.log(this.lunboList)
          } else {
            Toast("加载数据失败");
          }
        });
    }
  },
  created() {
    this.getLunbo();
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {

  height: 300px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: cyan;
    }
    &:nth-child(2) {
      background-color: lightgreen;
    }
    &:nth-child(3) {
      background-color: skyblue;
    }
  }
}
img {
  width: 100%;
  height: 100%;
}
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: 0;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
.mui-table-view-cell img {
  width: 60px;
  height: 60px;
}
.tianchong {
  background: url("../../images/1.jpg");
  background-size: cover;
  margin: 0;
  text-align: center;
  width: 100px !important;
  height: 60px !important;
}

</style>
