
//局部

import My from './My';
export default {



  install(Vue, config){  //config 用来配置插件

    Vue.prototype.$My = function (msg, Dom) { //这个msg用对当前事件的配置
      console.log(msg,Dom);
      let dom = document.createElement('div');
      dom.innerText = '这里是添加的div';
      let Mymy = Vue.extend(My);
      // console.log(My);
      let vm = new Mymy().$mount(dom);  //手动挂载
      // console.log(vm.msg);
      vm.msg = msg;

      // console.log(dom);
      Dom.appendChild(vm.$el);

    }
  }

}


