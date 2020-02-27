<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key='item.add_time'>
        <router-link :to="'/home/news/' + item.id">
          <img class="mui-media-object mui-pull-left" src="images/10.jpg" />
          <div class="mui-media-body">
            <h3>{{ item.title }}</h3>
            <div class="time">
              <span>发表时间:{{item.add_time | dataFormat}}</span>
              <span>点击:{{item.click}}次</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    
  data() {
    return {
        newslist:[],
    };
  },
  created(){
     this.getNewList(); 
  },
  methods:{
      getNewList(){
          this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then((res) => {
              if(res.body.status === 0){
                  this.newslist = res.body.message
                console.log(this.newslist)
              }else{
                  Toast("获取失败")
              }
          })
      }
  }
};
</script>

<style lang="scss">
.mui-media-body {
  h3 {
    font-size: 16px;
  }
  .time {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      color:skyblue;
    }
  }
}
</style>
