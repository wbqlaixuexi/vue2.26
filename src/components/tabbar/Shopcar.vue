<template>
  <div class="shopcar">
    <van-swipe-cell v-for="item in shopCarList" :key="item.id">
      <van-card
        :num="o[item.id]"
        :price="item.sell_price"
        desc="描述信息"
        :title="item.title"
        class="goods-card"
        :thumb="item.thumb_path"
        ref="card"
      >
        <div slot="footer">
          <van-button size="mini" @click="add(item.id)">+</van-button>
          <van-button size="mini" @click="reduce(item.id)">-</van-button>
        </div>
      </van-card>

      <van-button
        slot="right"
        square
        text="删除"
        type="danger"
        class="delete-button"
        @click='del(item.id)'
      />
      <van-checkbox
        v-model="selected[item.id]"
        slot="left"
        square
        text="删除"
        type="danger"
        class="delete-button"
        label-position="left"
        @click.stop="cancelChose(item.id)"
      />
      <!-- <van-radio-group>
        <van-radio name="1" slot='left' square type="primary"></van-radio>
      </van-radio-group> -->
      <hr />
    </van-swipe-cell>
    <van-submit-bar :price="this.$store.getters.getCount.money*100" button-text="提交订单" decimal-length=1>
      <van-checkbox v-model="all" @click="choseAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      all: false,
      shopCarList: [],
      o: {},
      selected: {},
      allMoney:0
    };
  },
  methods: {
    getGoodsList() {
      let idArr = [];
      this.$store.state.car.map(ele => {
        idArr.push(parseInt(ele.id));
      });
      if (idArr.length <= 0) {
          this.shopCarList = []
        return;
      }
      this.$http
        .get(
          "http://www.liulongbin.top:3005/api/goods/getshopcarlist/" +
            idArr.join(",")
        )
        .then(res => {
          if (res.body.status == 0) {
            this.shopCarList = res.body.message;
          }
        });
      this.$store.state.car.map(ele => {
        this.o[ele.id] = ele.count;
      });
    },
    add(id, e) {
      this.$store.state.car.map(ele => {
        if (ele.id == id) {
          ele.count++;
        }
        window.localStorage.setItem(
          "car",
          JSON.stringify(this.$store.state.car)
        );
        this.getGoodsList();
      });
    },
    reduce(id) {
      this.$store.state.car.some(ele => {
        if (ele.id == id) {
          ele.count--;
        }
        window.localStorage.setItem(
          "car",
          JSON.stringify(this.$store.state.car)
        );
        this.getGoodsList();
      });
    },
    selecte() {
      this.$store.state.car.map(ele => {
        this.selected[ele.id] = ele.selected;
      });
    },
    cancelChose(id) {
      this.$store.state.car.some(ele => {
        if (ele.id == id) {
          ele.selected = !ele.selected;
        }
      });
      this.$store.state.car.some(ele => {
        if (ele.selected == false) {
            this.all = false
          return true;
        } else {
          this.all = true;
        }
      });
      window.localStorage.setItem("car", JSON.stringify(this.$store.state.car));
      this.getGoodsList();
    },
    choseAll() {
      this.$store.state.car.map(ele => {
        if (this.all == true) {
          ele.selected = false;
          this.selected[ele.id] = false;
        } else {
          ele.selected = true;
          this.selected[ele.id] = true;
        }
      });
      window.localStorage.setItem("car", JSON.stringify(this.$store.state.car));
      this.getGoodsList();
    },
    selectAll() {
      this.$store.state.car.some(ele => {
        if (ele.selected == true) {
          this.all = true;
        } else {
          this.all = false;
          return true;
        }
      });
    },
    del(id){
        this.$store.state.car.some((ele,index) => {
            if(ele.id == id){
                this.$store.state.car.splice(index,1)
                window.localStorage.setItem("car",JSON.stringify(this.$store.state.car))
                this.getGoodsList()
                console.log(this.shopCarList)
                return true
            }
            
        })
    }
  },
  created() {
    this.getGoodsList();
    this.selecte();
    this.selectAll();
  },
};
</script>

<style lang="scss" scoped>
.shopcar {
  .van-button {
    font-size: 20px;
  }
  .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  }
  .van-swipe-cell__left {
    position: absolute;
    left: 7px;
    z-index: 2;
  }
}
</style>
