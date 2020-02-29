import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import app from "./app.vue";
import { Header, Swipe, SwipeItem, Button } from "mint-ui";
import "./lib/mui/css/mui.css";
import "./css/icons-extra.css";
import Vant from "vant";
import { Lazyload, ImagePreview,Card,SubmitBar,SwipeCell,RadioGroup, Radio,Checkbox,NavBar } from "vant";
import VueResource from "vue-resource";
import "./lib/vant/index.css";
import vuex from "vuex";

Vue.use(VueRouter);
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(VueResource);
Vue.use(Vant);
Vue.use(ImagePreview);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(vuex);
Vue.use(Card) 
Vue.use(SubmitBar)
Vue.use(SwipeCell)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(NavBar)
Vue.use(Checkbox)
Vue.use(Lazyload, {
  preLoad: 1,
  error: "./images/10.jpg",
  loading: "./images/8.jpg",
  attempt: 1
});
import "vant/lib/index.css";

Vue.filter("dataFormat", function(datastr1, partten = "YYYY-MM-NN AA:BB:CC") {
  let datastr = new Date(datastr1);
  let tt =
    [
      datastr.getFullYear(),
      datastr.getMonth() + 1 < 10
        ? "0" + (datastr.getMonth() + 1 * 1)
        : datastr.getMonth() + 1,
      datastr.getDay() < 10 ? "0" + datastr.getDay() : datastr.getDay()
    ].join("-") +
    " " +
    [
      datastr.getHours() < 10 ? "0" + datastr.getHours() : datastr.getHours(),
      datastr.getMinutes() < 10
        ? "0" + datastr.getMinutes()
        : datastr.getMinutes(),
      datastr.getSeconds() < 10
        ? "0" + datastr.getSeconds()
        : datastr.getSeconds()
    ].join(":");
  return tt;
});
let store = new vuex.Store({
  state: {
    car: JSON.parse(window.localStorage.getItem("car")|| '[]')
  },
  mutations: {
    addToShopCar(state, obj) {
      let flag = false;
      state.car.some(function(item) {
        if (item.id == obj.id) {
          item.count += parseInt(obj.count);
          flag = true;
          console.log(state.car);
          return true;
        }
      });
      if (flag == false) {
        state.car.push(obj);
        console.log(state.car);
      }
    }
  },
  getters: {
    getAllCount(state) {
      let c = 0;
      state.car.forEach(ele => {
        c = parseInt(c) + parseInt(ele.count) * 1;
      });
      return c;
    },
    getCount(state){
      let o = {
        count: 0,
        money:0
      }
      state.car.map(ele => {
        if(ele.selected == true){
          o.count += ele.count
          o.money += ele.count * ele.price;
        }
      })
      return o;
    }
  }
});
let vm = new Vue({
  el: "#app",
  data: {},
  render: c => c(app),
  router,
  store
});
