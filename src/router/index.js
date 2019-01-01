import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// @是webpage做的映射 相当于 src 文件夹

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Film from '@/pages/Film'

import  Ciname from '@/pages/Ciname'
import  Mine from '@/pages/Mine'
import  Search from '@/pages/Search'
import  Detail from '@/pages/Detail'
//城市d定位页
import City from '@/pages/City'

//用来练习高德定位
import  Map from '@/pages/Map'
//用来练习Vue 插件
import Plugin from '@/pages/Plugin'

import  Error from '@/components/Error'

//use 就是vue使用插件 初始化插件的一个方法
Vue.use(Router);



let router = new Router({

  // mode: 'hash', //路由显示模式。 hash为代#号的模式  例如 #/home, history 为 浏览器模式  显示为 /home, 默认方式是 hash

  // linkActiveClass: class名,   //定义声明式导航的  被点击后激活的样式。 配合 router-link 标签使用的。

  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },

    {
        path: '/',
        //路由重定向
        redirect: '/home'
    },


    {
      path: '/home',
      // name: 'Home',
      component: Home,
      children: [
        //路由重定向
        {path: '/', component: Film},
        {path: '/film', component: Film},



        //路由懒加载 详见vue-router 官网  ， 实现按需加载的方式，只用用到的时候才会 加载 film 组件， 演示的使用注释掉
        // 上面的代码（不然报错，因为这 只是 演示，其他地方的代码会受影响）
        // {path: '/', component: Film},{path: '/film', component: Film}, 和上面 引入  import Film from '@/pages/Film'的代码。
        //然后再浏览器查看效果的是时候 发现 film 是空白页， 所以，因为没用到这个组件，切换一个路由（换一线页面），再切回来就看到效果了。
        // {path: '/film', component: ()=> import('@/pages/Film')}, //路由懒加载 详见vue-router 官网  ， 实现按需加载的方式，


        {path: '/ciname', component: Ciname},

        //全局实现  只拦 mine
        {
          path: '/mine',
          component: Mine,
/*
          meta: {  // 可以在 全局拦截的 router.beforeEach   to 上 看到meta  路由元信息
              x: 'xxx'
          }
          */
          //利用 meta 用路由元信息  ，相当于设置一个标志位， 确定是否拦截 这个路径 、接口
          meta: {  // 可以在 全局拦截的 router.beforeEach   to 上 看到meta  路由元信息
            //把这个标志为设置成 isRequired
            isRequired: '1',
            // color: 'red'  // 也可以根据不同用户给他 设置 不同的样式  mine页要设置 :style="{color: $route.meta.color}
          }


        }

      ]

    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    //去详情页， 路由传参方法一：
/*
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    */
    //去详情页， 路由传参方法二：
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },



    {//用来练习高德定位
      path: '/map',
      name: 'Map',
      component: Map
    },

    //城市定位页
    {
      path: '/city',
      name: 'City',
      component: City
    },
    //用来练习Vue 自己封装插件
    {
      path: '/plugin',
      name: 'Plugin',
      component: Plugin,
    },


    //处理错误路由，未定义路由
    {path: '*', component: Error},


  ]
});

//路由的全局拦截  接收一个回调函数

router.beforeEach((to,from,next)=>{// 进入
    // console.log(to);
    // console.log(this);
/*  错误写法：
    let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));

    if(!isLogin){ //没登录
        this.$router.push('/login');  //这样写出错  因为已经在 roter里了所以，不用this了
    }else{

      next();

    }

   */

    //正确写法：
/*

    let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));

    if( isLogin || to.path === '/login'){ //如果已经登录 或者 直接去登录页
        next();  //放行
    }else{  //未登录
      // router.push({path: '/login', params: {to: to}});  // 不用用this了
      router.push({name: 'Login', query: {path: to.path}});  // 不用用this了

    }
*/

  //全局实现  只拦 mine

    // console.log(to);  //meta: {x: "xxx"}
    // 判断是否拦截这个路径、接口
    if(to.meta.isRequired){

        let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));

        if( isLogin || to.path === '/login'){ //如果已经登录 或者 直接去登录页
          next();  //放行
        }else{  //未登录
          // router.push({path: '/login', params: {to: to}});  // 不用用this了
          router.push({name: 'Login', query: {path: to.path}});  // 不用用this了

        }


    }else{
      next(); //不是要拦截的 '/mine'接口  放行
    }



});




export default router;
