<template>
    <div class="film">

          <div class="h_box">
              <Header title="猫眼电影"></Header>

              <!--<h1 class="film_title">{{ title }}</h1>-->
              <div class="film_slider">
                <span class="film_slideer_1" @click="goCity">{{ city }}<i v-show="city != '定位中' " class="fa fa-sort-desc" aria-hidden="true"></i></span>
                <span :class="{film_slideer_2: true, on: tabIndex === 0}" @click="swichSwiper(0)">正在热映</span>
                <span :class="{film_slideer_3: true, on: tabIndex === 1}" @click="swichSwiper(1)">即将上映</span>
                <span class="film_slideer_4" @click="p"><i class="fa fa-search" aria-hidden="true"></i></span>
              </div>

          </div>

          <div class="film_swiper">

              <div class="swiper-container swiper-no-swiping">
                 <div class="swiper-wrapper">
                    <div class="swiper-slide"><Hot></Hot></div>
                    <div class="swiper-slide"> <Soon></Soon> </div>
                 </div>
              </div>

          </div>


<!--

          <footer>

              <div v-for="item, index in navArr" :class="{film_nav: true, current: index==isShow}"  @click.stop='goPath(index)'>
                <p><i :class="item.icon" aria-hidden="true"></i> </p>
                <p>{{item.title}}</p>
              </div>

          </footer>

-->

    </div>

</template>


<script>
  //引入组件

  import Header from  '../components/Header';
  import Hot from  '../components/Hot';

  import Soon from  '../components/Soon';

  import { mapState, mapActions } from 'Vuex';


    export default {
      name: "Film",

      //引入组件
      components: {
        Header,
        Hot,
        Soon
      },


      data(){
        return {
          title: '猫眼电影',
          isShow: 0,
          tabIndex: 0,
          mySwiper: '',
          // city: '定位中',
          navArr: [
            {title: '电影', icon: 'fa fa-film', path: 'film'},
            {title: '影院', icon: 'fa fa-picture-o', path: 'ciname'},
            {title: '我的', icon: 'fa fa-user-o', path: 'mine'}
          ]
        }
      },
      //定位后的城市从vuex中获取
      computed: {
        ...mapState(['city']),
      },

      mounted(){

        /*给 Home.vue 的<router-view/>包裹上<keep-alive></keep-alive>后，就不会在路由切换的的时候就不会每次都执行created和mounted钩子函数了*/
        /*如果再想判断时候进入了路由， 这是后我们可以用  加上keep-alive 后的两个钩子函数，activated(进入钩子)  和 deactivated（离开钩子），在下面演示了 */
        console.log('Film页mounted，加了keep-alive后我就执行一次了');


        //new 轮播
        this.mySwiper = new Swiper('.swiper-container', {
          // autoplay: true,//可选选项，自动滑动
        });


        //记录vueComplete 实例
        let self = this;

        //只获取获取城市信息   其他用法见 Map.vue 文件页

        //初始化
        var map = new AMap.Map('');  //不需要在容器里显示城市地图， 第一个参数要只传一个空字符串

        AMap.plugin('AMap.CitySearch', function () {
          var citySearch = new AMap.CitySearch();
          citySearch.getLocalCity(function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // 查询成功，result即为当前所在城市信息

              // console.log(result);

                // console.log(self);
                let cityStr = result.city;  // 去除 青岛市  里的  市
                let end = cityStr.length - 1;
                // self.city = cityStr.slice(0, end);
                //设置到vuex中
                let city = cityStr.slice(0, end);
                self.setStateCity(city);

                //储存到vuex 中并不能很好的解决问题， 路由跳转的情况（点击导航）可以实现全局状态管理， 但是点击浏览器的刷新，vuex中的状态也会初始化
                //所以决定用 sessionStorage 储存一 下   ， 上面vuex 的代码也不注释了。
                sessionStorage.setItem('city', city);


            }
          })
        })


      },
/*

      // 路由离开钩子函数
      beforeRouteLeave(to,form,next){
        //【注意】  取消全局的事件或者变量

        console.log('/film',this);
        next(); //放行
      },

*/


      methods: {
        goPath(index){
          this.isShow = index;
          //跳转
          this.$router.push(this.navArr[index].path);

        },

        swichSwiper(index){
          // console.log(index);

          this.mySwiper.slideTo(index, 300, false);
          //点击激活样式
          this.tabIndex = index;

        },


        p(){
          this.$router.push('/search');
        },

        detail(){
          this.$router.push('/detail');
        },

        //映射vuex的action
        ...mapActions(['setStateCity']),



        //跳转城市定位页
        goCity(){
          // console.log(2212);
          this.$router.push('/city');
        }


      },

      // keep-alive 钩子
/*
      activated(){
        console.log('activated钩子，进入film了');
      },
      deactivated(){
        console.log('deactivated钩子，离开film了');
      }
*/




    }
</script>

<style scoped>

    .film {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .h_box {
      position: fixed;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 2;
    }

    .film .film_title {
      height: 50px;
      background-color: #e54847;
      font-size: 20px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-weight: normal;


    }

    .film_swiper{
      width: 100%;
      height: auto;
      overflow: auto;
    }



    .film_slider{
      display: flex;
      line-height: 44px;
      padding: 0 20px;
      background: #fff;
    }

    .film_slideer_1{
      text-align: left;
      font-size: 15px;
      color: #666;
    }

    .film_slideer_1>i{
      position: relative;
      top: -3px;
    }

    .film_slideer_4{
      text-align: right;
      color: #e54847;
      font-size: 22px;

    }

    .film_slideer_1, .film_slideer_4{
      width: 50px;
    }

    .film_slideer_2, .film_slideer_3{
      flex: 1;
      text-align: center;
    }
    .film_slideer_2.on, .film_slideer_3.on{
      color: #e54847;
      border-bottom: 2px solid #e54847;
    }
/*

    footer {
      display: flex;
      position: fixed;
      line-height: 50px;
      border-top: .5px solid #d8d8d8;
      background-color: #fff;
      bottom: 0;
      width: calc(100vw);
    }

*/

    .film_nav{
      flex: 1;
      text-align: center;
    }

    .film_nav p{
      font-size: 16px;
      line-height: 25px;

    }


    .film_nav.current{
      color: #e54847;
    }





</style>
