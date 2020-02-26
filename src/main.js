import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import app from './app.vue'
import {Header} from 'mint-ui'
import './lib/mui/css/mui.css'
Vue.use(VueRouter)
Vue.component(Header.name,Header)
let vm = new Vue({
  el:'#app',
  data:{

  },
  render:c => c(app),
  router
})