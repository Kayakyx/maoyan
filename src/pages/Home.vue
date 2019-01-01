<template>
    <div class="home">

      <!--缓存全部路由-->
      <keep-alive>
        <router-view/>
      </keep-alive>

      <!--
       方便演示 cinamebody.vue 组件里 ，记录页面滚出高度（方法2） 的代码
        keep-alive的 exlude 代表不换成哪个路由组件，这里不缓存 Cinema 组件，因为cinema 组件的 子组件 Cinamebody 是采用 vuex的方式 实现的
        路由切换，记录页面滚出高度的，主要是 这样是每次都在 mounted 钩子函数内 恢复 原来滚出的高度的， 因为如果缓存了，Cinema组件（包含子组件），
        这样 created/mounted  钩子函数就执行一次了， 所以为了方便演示 vuex 方式，记录滚出高度， 所以加了 exclude="Ciname",

        个人认为： 还是采用 全部缓存的方法好用， 因为没用每一次 路由切换的时候， 都发送 ajax请求了。

      -->

    <!--
      <keep-alive exclude="Ciname">
        <router-view/>
      </keep-alive>

      -->

      <footer>
          <div v-for="item, index in navArr" :class="{home_nav: true, current: index==isShow}"  @click.stop='goPath(index)'>
            <p><i :class="item.icon" aria-hidden="true"></i> </p>
            <p>{{item.title}}</p>
          </div>

      </footer>
    </div>
</template>

<script>
    // import {mapState, mapActions} from "Vuex";  想把 isShow 存到vuex当中 发现不能解决问题

    export default {

        name: "Home",
        data(){
          return {
            title: '猫眼电影',
            isShow: 0,
            navArr: [
              {title: '电影', icon: 'fa fa-film', path: 'film'},
              {title: '影院', icon: 'fa fa-picture-o', path: 'ciname'},
              {title: '我的', icon: 'fa fa-user-o', path: 'mine'}
            ]
          }
        },
/*

      computed:{
          //映射vuex中的状态
        ...mapState(['tabIsShow'])
      },
*/
/*
      mounted(){
        console.log(this.tabIsShow);
        this.setStateTabIsShow(888);
        console.log(this.tabIsShow);
      },*/

      mounted(){
        /*
        //方法一(代码)：  刷新不改变，底部导航的激活样式  （Mine 页 有bug,没有完美解决）
        //组件挂载完毕后 获取原来 的index
        let isShow = sessionStorage.getItem('isShow');
        if(!isShow) return; //不存在
        //存在
        this.isShow = isShow;
        */

        //方法二(代码)：  刷新不改变，底部导航的激活样式 ，通过url里的 路由路径 实现
        //是隔几日 我发现，刷新时不会变，但是 点后后退前进底部导航的 激活样式  又会乱掉了。
        //解决方案： 经过测试发现，每次  点击浏览器的 前进、后退 按键时都会 触发 beforeUpdate/updated 钩子
        //所以把这段代码搬过去 就可以解决 点击 前进后退 底部导航  激活样式 会乱掉的问题了。
        // console.log(this.$route)
        //
        // if( this.$route.fullPath === '/film') this.isShow = 0;
        // if( this.$route.fullPath === '/ciname') this.isShow = 1;
        // if( this.$route.fullPath === '/mine') this.isShow = 2;

        //改成调用函数
        this.getRouterNum();

        console.log('Home--mounted');

      },


        methods: {
            goPath(index){
              this.isShow = index;
              //跳转
              this.$router.push(this.navArr[index].path);

              //方法一(代码)：  刷新不改变，底部导航的激活样式  （Mine 页 有bug,没有完美解决）
              //持久化，避免 刷新后 不是激活状态
              // sessionStorage.setItem('isShow', index);

              //方法二： 解决 见 mounted



            },
/*
            //映射vuex 的actions
          ...mapActions(['setStateTabIsShow'])*/


            /*---获取路由对应导航的下标---*/
            getRouterNum(){
              if( this.$route.fullPath === '/film') this.isShow = 0;
              if( this.$route.fullPath === '/ciname') this.isShow = 1;
              if( this.$route.fullPath === '/mine') this.isShow = 2;
            }


        },

      //解决方案： 经过测试发现，每次  点击浏览器的 前进、后退 按键时都会 触发 beforeUpdate/updated 钩子
      //所以把这段代码搬过去 就可以解决 点击 前进后退 底部导航  激活样式 会乱掉的问题了。
        beforeUpdate(){
          // console.log('Home--beforeUpdate');
          //
          // if( this.$route.fullPath === '/film') this.isShow = 0;
          // if( this.$route.fullPath === '/ciname') this.isShow = 1;
          // if( this.$route.fullPath === '/mine') this.isShow = 2;

          // 对用获取路由对应导航的下标函数
          this.getRouterNum();



        },
/*

        updated(){
          console.log('Home--updated');
        }

*/


    }
</script>

<style scoped>

    .home {
      width: 100%;
      height: 100%;
    }

    .home .home_title {
      height: 50px;
      background-color: #e54847;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-weight: normal;


    }

    .home_swiper{
      width: 100%;
      height: auto;
    }



    .home_slider{
      display: flex;
      line-height: 44px;
      padding: 0 20px;
      background: #fff;
    }

    .home_slideer_1{
      text-align: left;
    }
    .home_slideer_4{
      text-align: right;
      color: #e54847;
      font-size: 22px;

    }

    .home_slideer_1, .home_slideer_4{
      width: 50px;
    }

    .home_slideer_2, .home_slideer_3{
      flex: 1;
      text-align: center;
    }
    .home_slideer_2.on, .home_slideer_3.on{
      color: #e54847;
      border-bottom: 2px solid #e54847;
    }

    footer {
      display: flex;
      position: fixed;
      line-height: 50px;
      border-top: .5px solid #d8d8d8;
      background-color: #fff;
      bottom: 0;
      width: calc(100vw);
      z-index: 22;
    }


    .home_nav{
      flex: 1;
      text-align: center;
    }

    .home_nav p{
      font-size: 16px;
      line-height: 25px;

    }


    .home_nav.current{
      color: #e54847;
    }




</style>
