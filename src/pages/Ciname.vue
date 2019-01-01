<template>
  <div class="ciname">
    <div class="absolute">
      <Header title="影院" ></Header>

      <div class="top">
        <span class="city" @click="goCity">{{ city }}<i class="fa fa-sort-desc" aria-hidden="true"></i></span>
        <p class="search" @click="goSearch"><i class="fa fa-search"></i><em>搜影院</em></p>
      </div>

<!--
      提成Navbar组件了
      <div class="nav-wrap">
        <div class="sup_nav">
          <span v-for="item,index in navArr" :class="{ on: isShow == index }" @click="tab(index)">{{ item }}<i class="fa fa-sort-desc"></i></span>
        </div>
        <div class="sub">
          <div class="allcity item" v-show="isShow == 0">全城</div>
          <div class="brand item" v-show="isShow == 1">品牌</div>
          <div class="feature item" v-show="isShow == 2">特色</div>
        </div>

      </div>

      -->

      <Navbar/>

    </div>

    <Cinamebody/>




  </div>





</template>

<script>
  import Header from "../components/Header";
  // import { mapState } from "Vuex";  从vuex 中 改用 从sessionStorage获取定位城市信息
  import Cinamebody from "../components/Cinamebody";
  //导航组件
  import Navbar from "../components/Navbar";


  // 引入 异步请求工具 axios
  //import axios from 'axios'
  //方法一：
  // 简单用， 只想在本.vue文件里使用 只在这里import 引用即可；（这里演示的事简单使用），
  //如果使用方法二 ， 在这个 组件里，就不用 import axios from 'axios'  引入了。


  //方法二：
  // 如果想把 axios 注册到 vue实例上，在vue项目里在哪都能用的情况下，
  // 要在main.js 里引用，然后原型给vue添加 即可, 实例如下。
  //import axios from 'axios'
  //Vue.prototype.$http = axios;
  //通过以上操作之后 就可以以 this.$http.get().then(function(){}).catch(function(){}) 的形式去使用了


    export default {
        name: "Ciname",
        components: {Header, Cinamebody, Navbar},

        data(){
          return {
            /*
            //提成 Navbar 组件了
            isShow: -1,
            navArr: ['全城','品牌','特色'],
            */

            city: '定位中'
          }
        },

      /*改用从 sessionStorage 中获取定位城市 信息
        computed: {
          ...mapState(['city']),
        },*/




        created(){
          /*给 Home.vue 的<router-view/>包裹上<keep-alive></keep-alive>后，就不会在路由切换的的时候就不会每次都执行created和mounted钩子函数了*/
          /*如果再想判断时候进入了路由， 这是后我们可以用  加上keep-alive 后的两个钩子函数，activated(进入钩子)  和 deactivated（离开钩子），在下面演示了 */
          console.log('cinema页created，加了keep-alive后我就执行一次了');

          // console.log(this);
          //获取 sessionStorage 中的定位城市信息
          let city = sessionStorage.getItem('city');
          if(!city) return; //不存在
          // 存在 就设置
          this.city = city;

        },


        methods: {
          /*

          tab(index){
            //判断现在是否已经显示了
            if(index == this.isShow){
              this.isShow = -1;
              return;
            }
            this.isShow = index;

          },
          */

          goSearch(){
            //跳转
            this.$router.push('/search');
          },

          goCity(){
            this.$router.push('/city');
          }

        },



        mounted(){
/*

          //axios 的基本使用方法  别忘了 npm  下载

          方法一：
          axios.get('http://localhost:3000/getList').then(function (res) {
                console.log(res);
          }).catch(function () {
                console.log('请求失败执行的函数');
          });

*/
/*

          //方法二：  把 axios 挂载到vue实例上。
          this.$http.get('http://localhost:3000/getList').then(function (res) {
             console.log(res);
          }).catch(function () {
            console.log('请求失败执行的函数');
          });



*/



        },
/*

      activated(){
          console.log('进入cinema');
      },
      deactivated(){
          console.log('离开cinema');
      }

*/



    }
</script>

<style scoped>
    .ciname{
      position: relative;
      height: calc(100vh);


    }
    .absolute{
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 44;
    }
    .top {
      display: flex;
      background: #f5f5f5;
      height: 44px;
      align-items: center;

    }

    .city{
      width: 62px;
      text-align: right;
      font-size: 15px;
      color: #666;
    }

    .city>i{
      position: relative;
      top: -3px;
    }

    .search{
      flex: 1;
      height: 29px;
      background-color: #fff;
      margin-right: 15px;
      margin-left: 18px;
      text-align: center;
      font-size: 13px;
      color: #b2b2b2;
      line-height: 29px;
      border-radius: 4px;
    }

    .top em{
      font-style: normal;
      margin-left: 4px;
    }


    /*
        //提成 Navbar 组件了
        .nav-wrap{
          height: 40px;

          border-bottom: 1px solid #f5f5f5;
          background-color: #fff;


        }

        .sup_nav{
          width: 100%;
          height: 100%;
          display: flex;
        }
        .nav-wrap span{
          flex: 1;
          text-align: center;
          line-height: 40px;
          font-size: 13px;
        }

        .nav-wrap span:nth-child(2){
          border-left: 1px solid #f5f5f5;
          border-right: 1px solid #f5f5f5;
        }

        .on{
          color: #e54847;
        }
        .on i{
          transform: rotate(-180deg);

        }

        .nav-wrap span i{
          vertical-align: baseline;
        }
        .suv {
          position: absolute;
          display: block;
          width: 100%;
          left: 0;
          bottom: 0;
          background-color: #2c3e50;
          z-index: 2;
        }

        .sub .item{
          width: 100%;
          height: 300px;
          background-color: #f5f5f5;
        }
    */





</style>
