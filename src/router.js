import VueRouter from "vue-router";
import Home from "./components/tabbar/Home.vue";
import Member from "./components/tabbar/Member.vue";
import Search from "./components/tabbar/Search.vue";
import Shopcar from "./components/tabbar/Shopcar.vue";
import NewsList from "./components/newList/NewsList.vue";
import news from './components/newList/news.vue'
let router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: Home
    },
    { path: "/member", component: Member },
    { path: "/shopcar", component: Shopcar },
    { path: "/search", component: Search },
    {
      path: "/home/newlist",
      component: NewsList
    },
    {
      path: "/home/news/:id",
      component: news
    }
  ],
  linkActiveClass: "mui-active" //覆盖默认的类，router-link-active
});
export default router;
