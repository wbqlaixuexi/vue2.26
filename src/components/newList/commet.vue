<template>
  <div class="commet">
    <h2 class="title1">发表评论</h2>
    <hr />
    <textarea placeholder="请输入评论内容(不可超过60字)" maxlength="60">
    </textarea>
    <mt-button type="primary">发表评论</mt-button>
    <div class="cmtbox">
      <ul class="cmtul">
        <li class="cmtli" v-for='(item,i) in cmtList' :key='item.add_time'>
          <p class="title">第{{i + 1}}楼 用户:匿名用户 发表时间:{{item.add_time | dataFormat}}</p>
          <p class="content">{{(item.content == 'undefined'? '此用户太懒' : item.content)}}</p>
        </li>
        
      </ul>
    </div>
    <mt-button type="danger" plain @click='getmore'>加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
        pageindex : 1,
        cmtList:[]
    }
  },
  props:["id"],
  created(){
      this.getcmtList()
  },
  methods:{
      getcmtList(){
          this.$http.get("http://www.liulongbin.top:3005/api/getcomments/" + this.id + '?pageindex=' + this.pageindex ).then((res) => {
              if(res.body.status === 0){
                  this.cmtList = this.cmtList.concat(res.body.message);
                  console.log(this.cmtList)
              }
          })
      },
      getmore(){
          this.pageindex += 1;
          this.getcmtList();
      }
  }
};
</script>

<style lang="scss">
.commet {
  padding: 0 10px;
  .title1 {
    font-size: 16px;
  }
  .mint-button--normal {
    width: 100%;
  }
  textarea {
    font-size: 12px;
    margin-bottom: 0;
  }
  .cmtbox {
    margin-top: 10px;
    margin-bottom: 10px;
    .cmtul {
      padding: 0;
      margin: 0;
      font-size: 12px;
      .cmtli {
        list-style: none;
        margin-bottom: 4px;
        .title {
          background-color: pink;
          border-radius: 10px;
          text-indent: 1em;
          margin-bottom: 2px;
        }
        .content {
          text-indent: 2em;
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
