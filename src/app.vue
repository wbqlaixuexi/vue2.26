<template>
  <div class="app-container">
    <!-- 头部区域 -->
    <mt-header fixed title="吴柏铅来学Vue"></mt-header>
    <transition>
      <router-view></router-view>
    </transition>
    <!-- 底部区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id='target'>0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    <!-- <img src="./images/1.jpg" alt="">  -->
  </div>
</template>

<script></script>

<style lang="scss" scoped>

.app-container {
  padding-top: 40px;
  background-color: #fff;
  overflow-x:hidden;
  padding-bottom:54px;
}

.v-leave-to{
  opacity:0;
  transform:translateX(100%);
    position: absolute;
}
.v-enter{
  opacity:0;
  transform:translateX(-100%);
    position: absolute;
  
}
.v-enter-active,
.v-leave-active{
  transition:all 0.4s ease;
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

// .mui-bar-tab .mui-tab-item-llb .mui-icon {
//     top: 3px;
//     width: 24px;
//     height: 24px;
//     padding-top: 0;
//     padding-bottom: 0;
// }
// .mui-bar-tab .mui-tab-item-llb .mui-icon {
//     top: 3px;
//     width: 24px;
//     height: 24px;
//     padding-top: 0;
//     padding-bottom: 0;
// }
</style>
