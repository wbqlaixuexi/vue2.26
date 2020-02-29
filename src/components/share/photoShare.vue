<template>
  <div>
    <van-tabs color='skyblue'  @click='handleClick($event)' >
      <van-tab v-for="(item,index) in topList" :title="item.title" :key='item.id' :name='item.id'> 
      </van-tab>
    </van-tabs>

    <div class='photoBox'>
        <ul class='photoList'>
            <router-link class='' v-for='item in photoList' :key = "item.id" :to="'/home/photoInfo/' + item.id" tag='li'> 
                <img :src="item.img_url" alt="" v-lazy='item.img_url'>
                <div class="info">
                    <h3 class='info-title'>{{item.title}}</h3>
                    <span class='info-body'>{{item.zhaiyao}}</span>
                </div>
            </router-link>
        </ul>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return{
            topList:[],
            photoList:[]
        }
    },
    methods:{
        getTopList(){
            this.$http.get("http://www.liulongbin.top:3005/api/getimgcategory").then((res) => {
                if(res.body.status ==0){
                    console.log(res.body.message);
                    this.topList = res.body.message;
                    this.topList.unshift({title:'全部',id:0});
                    console.log(this.topList)
                }else{
                    Toast("获取数据失败")
                }
            })
        },
        getPhotoList(id){
            this.$http.get("http://www.liulongbin.top:3005/api/getimages/" + id).then((res) => {
                if(res.body.status === 0){
                    console.log(res.body.message)
                    this.photoList = res.body.message;
                }else{
                    Toast("获取数据失败")
                }
            })
        },
        handleClick(event){
            this.getPhotoList(event);
            
        }
    },
    created(){
        this.getTopList();
        this.getPhotoList(0);
    }
}
</script>

<style lang="scss" scoped>
    .photoList{
        margin:0;
        padding:10px;
        li{
            background-color: #ccc;
            text-align:center;
            margin-bottom:10px;
            border:1px solid #999;
            border-radius:6px;
            box-shadow:1px 1px 1px #999;
            position: relative;
            img{
                width: 100%;
                border-radius:6px;
                vertical-align:middle;
            }
            .info{
                position: absolute;
                bottom:0;
                left:0;
                background-color: rgba(0,0,0,0.3);
                color:#fff;
                text-align:left;
                height: 84px;
                line-height:20px;
                overflow:hidden;
                .info-title{
                    font-size:14px;
                }
                .info-body{
                    font-size:12px;
                }
            }
        }
    }
</style>
