/*
import Toast from './Toast';


export default {



  install(Vue, config){
    console.log(config);

    Vue.component('Tao',Toast);

    Vue.prototype.$toast = function () {
      console.log('toasttoast');
      let dom = document.createElement('div');
      // dom.innerText = '这里是添加的div';
      let toast = Vue.extend(Toast);
      console.log(toast);
      let vm = new toast().$mount(dom);  //手动挂载

      console.log(dom);
      document.body.appendChild(vm.$el);
    }
  }

}*/

/*

//过渡1

import Toast from './Toast';


export default {



  install(Vue, config){  //config 用来配置插件
    console.log(config);

    Vue.component('Tao',Toast);

    Vue.prototype.$toast = function (msg) { //这个msg用对当前事件的配置
      console.log(msg);
      let dom = document.createElement('div');
      // dom.innerText = '这里是添加的div';
      let toast = Vue.extend(Toast);
      console.log(toast);
      let vm = new toast().$mount(dom);  //手动挂载
      // console.log(vm);
      vm.msg = msg;

      console.log(dom);
      document.body.appendChild(vm.$el);
    }
  }

}
*/


/*

//过渡2

import Toast from './Toast';


export default {



  install(Vue, config){  //config 用来配置插件
    console.log(config);

    Vue.component('Tao',Toast);

    Vue.prototype.$toast = function (msg) { //这个msg用对当前事件的配置
      console.log(msg);
      let dom = document.createElement('div');
      // dom.innerText = '这里是添加的div';
      let toast = Vue.extend(Toast);
      console.log(toast);
      let vm = new toast().$mount(dom);  //手动挂载
      // console.log(vm);
      vm.msg = msg;

      console.log(dom);
      document.body.appendChild(vm.$el);
      //自动消除
      setTimeout(function () {
        document.body.removeChild(vm.$el);
      }, config.time);

    }
  }

}
*/

/*

//过渡3  重复点击效果不叠加

import Toast from './Toast';

export default {



  install(Vue, config){  //config 用来配置插件
    console.log(config);

    Vue.component('Tao',Toast);

    let flag = false;
    Vue.prototype.$toast = function (msg) { //这个msg用对当前事件的配置

      //判断上一次点击是否完成
      if(flag) return;

      console.log(msg);
      let dom = document.createElement('div');
      // dom.innerText = '这里是添加的div';
      let toast = Vue.extend(Toast);
      console.log(toast);
      let vm = new toast().$mount(dom);  //手动挂载
      // console.log(vm);
      vm.msg = msg;

      console.log(dom);
      document.body.appendChild(vm.$el);
      flag = true;

      //自动消除
      setTimeout(function () {
        document.body.removeChild(vm.$el);
        //消失
        flag = false;
      }, config.time);

    }
  }

}
*/



//过渡4  重复点击效果不叠加 提取

import Toast from './Toast';

let plugin = {
      flag: false,  //提取到外面，就变成了可控制的了。因为就成了组件 的选项了。

      install(Vue, config){  //config 用来配置插件
        console.log(config);

        let self = this; // install 初始化之后就有this了，this为新创建出来的插件。

        // console.log(this); //{flag: false, install: ƒ}

        // console.log(self);


        // Vue.component('Tao',Toast);

        //这里过Vue 是全局的 Vue实例
        Vue.prototype.$toast = function (msg) { //这个msg用对当前事件的配置

          //判断上一次点击是否完成
          if(self.flag) return;

          console.log(msg);
          let dom = document.createElement('div');
          // dom.innerText = '这里是添加的div';
          let toast = Vue.extend(Toast); //创建构造器  参数是一个包含组件选项的对象( 在脚手架搭的vue 项目中， 可以理解为一个 .vue 文件， 其实.vue文件 export default 就是 一个对象嘛。)。
          console.log(toast);
          //手动挂载  将 创建 toast 实例（必须把构造起 new 一下，才能得到组件实例），并手动挂载到一个元素上（dom）。  <div> toast组件 </div>  如果不懂，看一下官方的 Vue.extend 例子就差不多了。
          let vm = new toast().$mount(dom);
          //得到组件实例之后，就可以 在上面 找 你在   .vue 文件里  定义 的 数据 什么的了。
          console.log(vm);   // Toast 组件 实例。
          vm.msg = msg;

          console.log(dom);
          document.body.appendChild(vm.$el);
          self.flag = true;

          //自动消除
          setTimeout(function () {
            document.body.removeChild(vm.$el);
            //消失
            self.flag = false;
          }, config.time);

        }
      }

}

export default plugin;
