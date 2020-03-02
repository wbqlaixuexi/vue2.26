<template>
  <div class="photoInfo">
    <h3>{{ photoInfo.title }}</h3>
    <div class="title-span">
      <span>发表时间:{{ photoInfo.add_time | dataFormat }}</span>
      <span>点击次数:{{ photoInfo.click }}次</span>
    </div>
    <hr />
    <!-- 缩略图 -->
    <div class="suoluetu">
      <img :src="item" @click='getImg(suolue,index)' v-for="(item, index) in suolue" :key='index'/>
    </div>
    <div class="content" v-html="photoInfo.content"></div>
    <!-- 评论区域 -->
    <commet :id="id"></commet>
  </div>
</template>

<script>
import commet from "../newList/commet.vue";
import { ImagePreview } from 'vant';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: [],
      images: [
        "../../images/11.jpg",
        "../../images/12.jpg",
        "../../images/13.jpg"
      ],
      show: false,
      index: 0,
      suolue:[],
      
    };
  },
  methods: {
    getInfo() {
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/getimageInfo/" +
            this.$route.params.id
        )
        .then(res => {
          if (res.body.status === 0) {
            // console.log(res.body);
            this.photoInfo = res.body.message[0];
          }else{
              Toast("获取数据失败")
          }
        });
    },
    getImg(images1,index){
        ImagePreview({
          images:this.suolue,     
          startPosition:index
      })
    },
    getsuolue(){
        this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then((res) => {
            if(res.body.status ==0){
                let o = [];
                o = res.body.message;
                o.forEach((ele,ind) => {
                    
                    this.suolue.push(ele.src)
                    console.log(this.suolue)
                })
            }else{
                Toast("获取数据失败")
            }
        })
    }
  },
  components: {
    commet
  },
  created() {
    this.getInfo();
    this.getsuolue();
  },
  mounted() {
    // this.ImagePreview();
  }
};
</script>

<style lang="scss">
.photoInfo {
  padding: 3px;
  margin: 0;
  .suoluetu {
      padding:0 10px;
    img {
      width: 80px;
      margin-right:4px;
      margin-bottom:4px;
    }
  }
  h3 {
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    color: skyblue;
    font-weight: 400;
  }
  .title-span {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
  .content {
    font-size: 14px;
    padding: 0 10px;
  }
}
</style>
