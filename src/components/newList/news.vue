<template>
  <div class="news">
    <h3 class="title">{{ newslist.title }}</h3>
    <p class="footer">
      <span class="time">发表时间:{{ newslist.add_time | dataFormat }}</span>
      <span>点击次数:{{ newslist.click }}次</span>
    </p>
    <hr />
    <div class="newsMain" v-html="newslist.content"></div>
    <!-- 评论区域 -->
    <div class="cmt">
        <commet :id='this.id'></commet>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import commet from "./commet.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newslist: []
    };
  },
  created() {
    this.getnewsList();
  },
  methods: {
    getnewsList() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getnew/" + this.id)
        .then(res => {
          if (res.body.status == 0) {
            this.newslist = res.body.message[0];
            // console.log(res);
          } else {
            // console.log(
            //   "http://www.liulongbin.top:3005/api/getnew/" + parseInt(this.id)
            // );
            Toast("获取数据失败");
          }
        });
    }
  },
  components:{
      commet
  }
};
</script>

<style lang="scss" scoped>
.news {
  .title {
    font-size: 16px;
    text-align: center;
    color: red;
    padding: 10px 0;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: skyblue;
    font-size: 12px;
  }
  .newsMain {
    padding: 0 10px;
  }
}
</style>
