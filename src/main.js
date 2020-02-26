import Vue from "vue";
import VueRouter from "vue-router";
import router from "./router";
import app from "./app.vue";
import { Header, Swipe, SwipeItem } from "mint-ui";
import "./lib/mui/css/mui.css";
import "./css/icons-extra.css";
import VueResource from "vue-resource";
Vue.use(VueRouter);
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(VueResource);
let vm = new Vue({
  el: "#app",
  data: {},
  render: c => c(app),
  router
});
