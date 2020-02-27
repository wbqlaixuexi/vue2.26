import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import app from "./app.vue";
import { Header, Swipe, SwipeItem,Button } from "mint-ui";
import "./lib/mui/css/mui.css";
import "./css/icons-extra.css";
import VueResource from "vue-resource";
Vue.use(VueRouter);
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(VueResource);

Vue.filter("dataFormat",function(datastr1, partten = 'YYYY-MM-NN AA:BB:CC'){
  let datastr = new Date(datastr1)
  let tt = [datastr.getFullYear(),((datastr.getMonth())+1 < 10 ? '0' + datastr.getMonth() + 1 : datastr.getMonth() + 1 ),((datastr.getDay()) < 10 ? '0' + datastr.getDay() : datastr.getDay())].join("-") + ' ' + [(datastr.getHours()<10?'0'+ datastr.getHours():datastr.getHours()),(datastr.getMinutes()<10?'0'+ datastr.getMinutes():datastr.getMinutes()),(datastr.getSeconds()<10?'0'+ datastr.getSeconds():datastr.getSeconds())].join("-")
  return tt;
})
let vm = new Vue({
  el: "#app",
  data: {},
  render: c => c(app),
  router
});
