import VueRouter from "vue-router";
import Home from "./components/tabbar/Home.vue";
import Member from "./components/tabbar/Member.vue";
import Search from "./components/tabbar/Search.vue";
import Shopcar from "./components/tabbar/Shopcar.vue";
import NewsList from "./components/newList/NewsList.vue";
import news from './components/newList/news.vue'
import photoShare from './components/share/photoShare.vue'
import photoInfo from './components/share/photoInfo.vue'
import Goodslist from './components/goodslist/goodlist.vue'
import goods from './components/goodslist/goods.vue'
import goodsDesc from './components/goodslist/goodsDesc.vue'
import goodscmt from './components/goodslist/goodscmt.vue'
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
    },
    {
      path:'/home/share',
      component: photoShare
    },
    {
      path: "/home/photoInfo/:id",
      component: photoInfo
    },
    {
      path: "/home/goodslist",
      component: Goodslist
    },
    {
      path: "/home/goods/:id",
      component: goods,
      name:'goods'
    },
    {
      path: "/home/goodsDesc/:id",
      component: goodsDesc,
      name:'goodsDesc'
    },
    {
      path:'/home/goodscmt/:id',
      component: goodscmt,
      name:'goodscmt'
    }
  ],
  linkActiveClass: "mui-active" //覆盖默认的类，router-link-active
});
export default router;
