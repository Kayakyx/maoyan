/*
 连续点击有 loading... 会 重叠 有 bug

import Loading from './Loading';
export default {

  install(Vue, config){  //config 用来配置插件

    Vue.prototype.$loading = function (DOM) { //这个msg用对当前事件的配置
      DOM = DOM || document.body;
      let dom = document.createElement('div');
      let PLoading = Vue.extend(Loading);

      let vm = new PLoading().$mount(dom);  //手动挂载

      DOM.appendChild(vm.$el);

      //function本质上也是一个对象，所以能给它添加属性(属性值当然可以是函数了)

      this.$loading.close = function () {
        DOM.removeChild(vm.$el);
      }

    }

  }

}

*/

import Loading from './Loading';

let plugin = {

  flag: false,

  install(Vue, config){  //config 用来配置插件

    Vue.prototype.$loading = function (DOM) { //这个msg用对当前事件的配置
      DOM = DOM || document.body;
      let dom = document.createElement('div');
      let PLoading = Vue.extend(Loading);

      let vm = new PLoading().$mount(dom);  //手动挂载

      DOM.appendChild(vm.$el);

      console.log(this);

      //function本质上也是一个对象，所以能给它添加属性(属性值当然可以是函数了)

      this.$loading.close = function () {
        DOM.removeChild(vm.$el);

      };
      console.log(this);


    }

  }

};

export default plugin;

