import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueResource from 'vue-resource'
import '@/common/fonts/iconfont.css'	//引入自定义图标样式
import themeicon from '@/common/fonts/iconfont.js'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

//使用插件
Vue.prototype.$axios = axios;
export default({
});

Vue.use(VueResource)

//使用滚动条
NProgress.configure({     
  easing: 'ease',  // 动画方式    
  speed: 500,  // 递增进度条的速度    
  showSpinner: false, // 是否显示加载ico    
  trickleSpeed: 200, // 自动递增间隔    
  minimum: 0.3 // 初始化时的最小百分比
})

//当路由进入前
router.beforeEach((to, from , next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
  next();
});

//当路由进入后：关闭进度条
router.afterEach( ( to, from, next ) => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
  //百度统计
  // setTimeout(()=>{
  //   var _hmt = _hmt || [];
  //   (function() {
  //     document.getElementById('baidu_a') && document.getElementById('baidu_a').remove();
  //     var hm = document.createElement("script");
  //     hm.src = "http://www.offcn.com/statics/js/bdtj_hlj.js";
  //     hm.id = "baidu_a";
  //     var s = document.getElementsByTagName("script")[0]; 
  //     s.parentNode.insertBefore(hm, s);
  //   })();
  // },0);
} );

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


