// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '../static/css/reset.css'  //引入css 当然也可以在 index.html 中引入，但是css文件必须在static文件夹下

// import '../static/font-awesome-4.7.0/css/font-awesome.min.css'

import axios from 'axios'  //引入 axios 异步请求工具 插件

import store from './store';

//映入封装好的vue插件

import toast from './plugin/toast';
import My from './plugin/my';
import loading from './plugin/loading';

Vue.prototype.$http = axios;
// 把 axios 方法 通过 原型 挂载 到vue根实例上（自定义key值为$http,vue实例也是一个对象嘛，所以可以自定义），
// 这样 在vue项目里哪里都可以用了，不用单个mport axios from 'axios' 引入了。
//就可以以 this.$http.get().then(function(){}).catch(function(){}) 的形式去使用了,post 请求类似 get请求。

/*

//全局中使用toast插件
Vue.use(toast, {
  name: 'Taohua',
  time: 3000
});

*/


//使用封装的vue插件
Vue.use(toast,{
  time: 3000
});
Vue.use(My);

Vue.use(loading);



Vue.config.productionTip = false;




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
