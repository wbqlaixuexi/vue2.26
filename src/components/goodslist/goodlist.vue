<template>
  <div class="goodslist">
    <div class="goodsitem" v-for="item in goodsList" :key='item.id' @click='handleClick(item.id)'>
      <img :src="item.img_url" alt="" />
      <div class="title">
        <p>{{item.title}}</p>
      </div>
      <div class="bottom">
        <p class="price">
          <span class="now">${{item.sell_price}}</span>
          <del>${{item.market_price}}</del>
        </p>
        <p class="keyword">
          <span class="sell">热卖中</span>
          <span class="has">还剩{{item.stock_quantity}}件</span>
        </p>
      </div>
      
    </div>
    <mt-button type='danger' plain class='more' @click='getMore'>加载更多</mt-button>
  </div>
</template>

<script>
import {Button} from 'mint-ui';
export default {
    data(){
        return{
            pageIndex:1,
            goodsList:[],
        }
    },
    methods:{
        getGoodsList(){
            this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageIndex).then((res) => {
                if(res.body.status === 0){
                    console.log(res.body.message)
                    this.goodsList = this.goodsList.concat(res.body.message)
                }
            })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        handleClick(id){
            this.$router.push({name:'goods' , params:{id}})
        }
    },
    created(){
        this.getGoodsList();
    }
}
</script>

<style lang="scss">
.goodslist{
    padding:7px 7px;
    display:flex;
    justify-content:space-between;
    flex-wrap:wrap;
    .goodsitem{
        width: 49%;
        border:1px solid #ccc;
        border-radius:4px;
        box-shadow:2px 1px 1px #999;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        min-height:300px;
        margin-bottom:8px;
        img{
            width: 100%;
            border-radius:4px;
        }
        .title{
            max-height:100px;
            padding:0 4px;
            
            p{
                font-size:12px;
                margin-bottom:0;
                width: 100%;
                height: 60px;
            }
        }
        .bottom{
            background-color: #ccc;
            margin:0 1px;
            padding:0 6px;
            border-radius:4px;
            margin-top:1px;
            .price{
                padding-top:2px;
                .now{
                font-size:16px;
                color:orange;
            }
            del{
                font-size:12px;
                margin-left:16px;
            }
            }
        }
        .keyword{
            font-size:12px;
            display:flex;
            justify-content:space-between;
        }
    }
    .more{
        width: 100%;
    }
}
</style>
