<template>
  <div class="goods">
    <transition
    @before-enter = 'beforeEnter'
    @enter='enter'
    @after-enter='afterEnter'>
       <div class='ball' v-show='ballFlag' ref='ball'></div>
    </transition>
    <!-- 商品展示区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <van-swipe :autoplay="3000" :height="300">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img v-lazy="image" :src="image" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
    <!-- 购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header title">
        <p>{{ goodsInfo.title }}</p>
      </div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goodsInfo">
            <p>
              <span style="font-size:14px">市场价:</span
              ><del class="old_price">${{ goodsInfo.market_price }}元</del
              ><span style="margin-left:20px;">销售价:</span>
              <span class="now_price">${{ goodsInfo.sell_price }}元</span>
            </p>
            <span>
              购买数量:
            </span>
            <myBtn @passCount='getCount' :max='goodsInfo.stock_quantity'></myBtn>
            <!-- <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
              <button class="mui-btn mui-btn-numbox-minus" type="button">
                -
              </button>
              <input
                id="test"
                class="mui-input-numbox"
                type="number"
                value="1"
              />
              <button class="mui-btn mui-btn-numbox-plus" type="button">
                +
              </button>
            </div> -->
            <div class="btn">
              <mt-button type="primary">立即购买</mt-button>
              <mt-button type="danger" @click='addShopCar'>加入购物车</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="goods1">
            <p>商品货号:{{ goodsInfo.goods_no }}</p>
            <p>库存情况:{{ goodsInfo.stock_quantity }}</p>
            <p>上架时间:{{ goodsInfo.add_time | dataFormat }}</p>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <div class="btn2">
          <mt-button type="primary" plain style="width:325px" @click="goDesc(id)"
            >图文介绍</mt-button
          >
          <mt-button type="danger" plain style="width:325px" @click='gocmt(id)'
            >商品评论</mt-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from "mint-ui";
import mui from "../../lib/mui/js/mui.min.js";
import myBtn from './mybtn.vue'
export default {
  data() {
    return {
      id: this.$route.params.id,
      images: [],
      goodsInfo: {},
      ballFlag:false,
      count:1
    };
  },
  methods: {
    getlunbo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id)
        .then(res => {
          if (res.body.status == 0) {
            let o = [];
            o = res.body.message;
            o.forEach((ele, ind) => {
              this.images.push(ele.src);
              //   console.log(this.images);
            });
          }
        });
    },
    getInfo() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id)
        .then(res => {
          if (res.body.status == 0) {
            this.goodsInfo = res.body.message[0];
            console.log(this.goodsInfo);
          }
        });
    },
    goDesc(id) {
      console.log(id)
     this.$router.push({name:'goodsDesc',params:{id}})
    },
    gocmt(id){
      this.$router.push({name:'goodscmt',params:{id}})
    },
    addShopCar(){
      this.ballFlag = true;
      let shopList = {
        id:this.id,
        count:this.count,
        price:this.goodsInfo.sell_price,
        selected:true
      }
      this.$store.commit('addToShopCar',shopList);
      window.localStorage.setItem("car",JSON.stringify(this.$store.state.car))
    },
    beforeEnter(el){
      el.style.transform = 'translate(0,0)'
    },
    enter(el,done){
      let target = document.querySelector("#target");
      let Y = target.getBoundingClientRect().top - this.$refs.ball.getBoundingClientRect().top;
      let X = target.getBoundingClientRect().left - this.$refs.ball.getBoundingClientRect().left;
      el.style.transform = `translate(${X}px,${Y}px)`
      el.style.transition = 'all 1s ease'
      done();
    },
    afterEnter(el){
      this.ballFlag = false;
    },
    getCount(count){
      this.count = count;
      console.log(this.count)
    }
  },
  created() {
    this.getlunbo();
    this.getInfo();
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  components:{
    myBtn
  }
};
</script>

<style lang="scss">
.goods {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    text-align: center;
  }
  img {
    height: 100%;
  }
  .goodsInfo {
    text-align: left;
    .old_price {
      font-size: 12px;
    }
    .now_price {
      font-size: 16px;
      color: orange;
    }
  }
  .title {
    font-size: 16px;
    p {
      margin: 0;
      color: #000;
    }
  }
  .mui-card-footer {
    .btn2 {
      height: 100px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  .goods1 {
    text-align: left;
  }
  .mui-numbox {
    margin-bottom: 10px;
  }
  .ball{
    width: 15px;
    height: 15px;
    z-index:99;
    background-color: red;
    border-radius:50%;
    position: absolute;
    top:490px;
    left:142px;
  }
}
</style>
