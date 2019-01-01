<template>
    <div class="soon" @scroll="scrollFun" ref="soon">
        <div class="sup_wrap">

          <h4>近期最受期待</h4>
          <div class="soon_box">

              <ul class="soon_slider" ref="ul">
                  <li v-for="item in filmArr" @click="goDetail">
                    <div class="img_wrap">
                      <img :src="item.img" alt="">
                      <span class="wish">{{ item.wish }}人想看</span>
                    </div>
                    <div class="info">
                        <span class="title">{{ item.nm }}</span>
                        <span class="date">{{ item.comingTitle }}</span>
                    </div>
                  </li>
              </ul>

          </div>


        </div>

        <Soonsub ref="child" :flag.sync="isAxios" :page.sync="pageSub" :rows.sync="rowsSub" :word.sync="word"></Soonsub>


    </div>
</template>

<script>
    import BetterScroll from 'better-scroll'

    import Soonsub from './Soonsub'



    export default {
        name: "Soon",

        data(){
          return{
            flag: 0,  //是否已经 在请求后台数据 标志位
            page: 0,  //第几页
            rows: 10, //每次请求的数据个数
            filmArr: [],

            isAxios: 0,
            pageSub: 0,
            rowsSub: 10,
            word: '加载更多',

            //用来记录 页面滚出高度，此方法依托于 keep-alive, 因为加了keep-alive(Home.vue的router-view)这里的数据会被换成，不会重置,
            //如果不想依托于keep-alive，可以储存到vuex当中（vuex是储存在内存中的，强制刷新时小时），或 存储到localStorage/sessionStorage 中（刷新也不会丢失，不建议使用，大材小用了）
            soonScrollDis: 0,

          }

        },



        components: {
          Soonsub
        },


        async mounted(){

          //页面一加载 初始化数据 请求10条

          // console.log(this.getMoreInit()); //Promise
          // await this.getMoreInit();
          let param = this.page * this.rows;
          await this.getMoreInit(param);

          /*---------------------*/
          let self = this;
          this.initUl();
/*
          此思路不对
          //this.initUl();
          // 等到整个视图都渲染完毕, 调用 this.initUl
          this.$nextTick( ()=>{
            // this.initUl();
          });
*/

          //s使用betterscroll
          //  soon_slider  //CLass  doument.querySelect(soon_slider')
          //第一个要点：fu元素
          //第二个要点： 目标元素必须是绝对定位
          // scrollX: scrollY
          let scroll1 = new BetterScroll('.soon_box',{ scrollX: true,scrollY: false, click: true });
          // console.log(scroll1);
          scroll1.on('scrollEnd',async (res) =>{
            // console.log(res);  // {x ,y }
            //left  clientWidth    this.$refs.ul.style.width
            //touch  （start  move  end  cancle）
            let l = Math.abs(res.x);    //像左滚出的距离
            // let w = document.documentElement.clientWidth;
            // 获取屏幕的宽度，这里用不到 ，因为这里 视口（可以看到ul宽度）的 宽度 是 ul父元素 的宽度。
            // 所以要获取父元素的宽度，而不是整个屏幕的宽度

            //获取ul视口的宽度
            //因为在定义 ul父元素的宽度是 使用的计算属性 calc 所以直接用  .style.width 获取不到用，用 getComputedStyle获取计算后的属性，
            //还用一个方法是  currentStyle  详见博客园
            let w = getComputedStyle(this.$refs.ul.parentNode, null).width;  //355.2px
            w = parseInt(w);// 转成整形数据   355
            // console.log(w);
            //获取ul 的总宽度
            let ulWidth = parseInt(self.$refs.ul.style.width);
            // console.log(self.$refs.ul.style);

            // console.log('滚出',l, "视口",w,"ul总宽", ulWidth);
            // console.log("到头判断前");

            //判断是否滑到头了 ( l + w ) = ulWidth  正好到底 ，这里给 它加 20px的冗余，还差20px到头是，就求数据


            if( ( l + w + 20 ) >= ulWidth){
              // console.log('到底了');
              if(this.flag) return;
              this.flag = 1;  //标志 已经发送 数据请求了
              //请求后台数据， 获取新数据

              /*
                  获取第一页的接口 http://m.maoyan.com/ajax/mostExpected?ci=60&limit=10&offset=0&token=
                  获取第二页的接口 http://m.maoyan.com/ajax/mostExpected?ci=60&limit=10&offset=10&token=

                  主要是 offset 的值 变化， 第一页 参数是 0， 第二页 参数是 10，
                  总结 page =0， rows= 10 不变， 每次 page++ 后乘 rows 传过去。
              */
              this.page++;

              let param = this.page * this.rows; //每次请求要传的参数

              await this.getMoreInit(param); //一定得等待异步完成之后 才能重设ul宽度

              //重设ul的宽度

              this.initUl();

              // console.log('initUl执行了');



            }
          });





        },


        methods: {
          initUl(){
            //动态设置ul的宽度
            let w = this.$refs.ul.children[0].offsetWidth;
            let l = this.$refs.ul.children.length;     //获取ul的下一共有几个 li ，以便动态设置ul的宽度。
            this.$refs.ul.style.width =  (w * l )+'px'; //

            // console.log(this.$refs.ul.style.width);

          },
          goDetail(){
            console.log('1111')
          },


          async getMoreInit(index){

            // console.log('调用');


            let data = null;

            // 请求数据  index 为请求接口要传的参数

            // console.log('执行了吗');
             data = await this.$http.get('/api/ajax/mostExpected?ci=60&limit=10&offset=' + index + '&token=');


            // console.log(data);
            if(data.status != 200) return; //数据请求失败 直接结束
            // console.log(data.data.coming)

            /*
            图片路径分析：
              正确地址：
              https://p1.meituan.net/170.230/movie/c7453592d38b7aff6a774a52732792cd3778866.jpg
              数据地址：
              http://p1.meituan.net/w.h/movie/c7453592d38b7aff6a774a52732792cd3778866.jpg
            */
            let tempArr = [];  //用来修改 图片地址


            tempArr = tempArr.concat(data.data.coming);

            //修改成正确的地址
            tempArr.map(item => {
              // console.log(item.img);
              item.img = item.img.replace('http', 'https');
              item.img = item.img.replace('w.h', '170.230');

              //处理日期信息
              //数据里的信息 '12月7日 周五' 只要 '12月7日'
              item.comingTitle = item.comingTitle.split(' ')[0];
              // console.log(item.comingTitle);

            });
            // console.log(tempArr);


            this.filmArr = this.filmArr.concat(tempArr); //储存 正确的影片信息数据

            // console.log(this.filmArr);

            //恢复初值

            this.flag = 0;



            //判断是否 是最后一页， 没有数据可以请求了。

            if(tempArr.length < this.rows){ //请求的数据长度小于 每页的个数是说明是最后一页了

              // console.log('到底执行了');
              this.flag = 1; // 禁止再请求后台数据

              //初始化 页
              this.page = 0;

            }

          },



          //整个页面的上拉加载


          scrollFun(){
            // console.log(1);
            // console.log(this.$refs.soon);

            let { scrollTop, scrollHeight, clientHeight } = this.$refs.soon;

            // console.log(scrollTop, scrollHeight, clientHeight);


            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的，此方法依托于 keep-live-----*/

            this.soonScrollDis =  scrollTop;

            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的，此方法依托于 keep-live--end---*/



            //判断是否到底了  多加20px 冗余

            if( scrollTop + clientHeight + 20 >= scrollHeight ){

                if(this.isAxios) return;

                this.isAxios = 1;

                console.log('到底了');
                this.word = '正在加载中';

                // （请求具体数据需要 把id传过去字符串形式且用逗号隔开）
                this.pageSub++;

                let start = this.pageSub * this.rowsSub;  // 提取影片id 开始位置
                let end = this.pageSub * this.rowsSub + this.rowsSub;  //结束位置

                //获取子组件 存id的数组

                let movieIdsArr = this.$refs.child.movieIdsArr;



              let getStrArr = movieIdsArr.slice( start, end);

                // 把提取出来的 id 拼接只字符串
                let getStr = getStrArr.join(',');
              console.log(getStr);

                //父组件调用子组件的方法 通过添加 ref
                // console.log(this.$refs.child.getMoreInit);
                this.$refs.child.getMoreInit(getStr);


            }



          }




        },

      //利用keep-alive 钩子函数 解决切换路由时， 滚出高度重置问题
      activated(){
        console.log('进入-即将上映');
        //进入时从恢复原来的滚动高度
        this.$refs['soon'].scrollTop = this.soonScrollDis;

      },

      deactivated(){
        // console.log('离开-正在热映');
        // 取refs 里的 dom 两种写法  this.$refs.hot  或者 this.$refs['hot']  在对象里 .和[] 都能取 对象的属性嘛
        // console.log(this.$refs['hot'].scrollTop);

        console.log('离开-即将上映时，滚出的高度为',this.soonScrollDis);
      }




    }
</script>

<style scoped>
  .soon{

    padding: 96px 0 50px 0;

    /*vue 的 @scroll 事件 必须给定 宽高（但不能 设置 100%， 100%是继承, calc 是 设置），和 overflow: auto*/
    width: calc(100vw);
    height:  calc(100vh);
    overflow: auto;
  }

  .soon .sup_wrap{
    height: 216px;
    /*background: cyan;*/
    padding: 0 10px;
    border-bottom: 10px solid #f2f2f2;
  }

  .soon .sup_wrap>h4{
    font-size: 14px;
    font-weight: normal;
    color: #333;
    line-height: 32px;
  }




  .soon_box{
    width: calc(100vw - 20px);
    /*height: 200px;*/

    height: 178px;
    /*padding: 0 10px;*/
    position: relative;
    overflow: hidden;

  }
  .soon_slider{
    position: absolute;
    width: 950px;
    /*一次10个 每个宽 95px, 宽度是用 js 控制的 这里写一个初始状态保险*/
  }
  .soon_slider li{
/*
    width: 180px;
    height: 200px;*/

    width: 85px;
    height: 156px;

    display: inline-block;
    /*padding: 0 15px;*/

    padding-right: 10px;


  }
  .soon_slider li .img_wrap{
      position: relative;
  }

  .soon_slider li .img_wrap>.wish{
      position: absolute;

      left: 0px;
      bottom: 0px;
      color: #faaf00;
      font-size: 11px;
      font-weight: 600;
      line-height: 52px;
      text-indent: 3px;

      width: 100%;
      height: 35px;
      background: linear-gradient(-180deg,rgba(77,77,77,0),#000);

      white-space: nowrap;

  }


   .soon_slider li .img_wrap>img{

    /*height: 200px;
    background-color: red;*/
     display: block;
     width: 85px;
     height: 115px;


  }

  .soon_slider li .info span{
    display: block;
  }

   .soon_slider li .info .title{

     /*margin: 0 0 3px;*/
     font-size: 13px;
     color: #222;
     font-weight: bold;
     line-height: 20px;

     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;


  }

   .soon_slider li .info .date{

     font-size: 12px;
     color: #999;
     line-height: 20px;


     white-space: nowrap;
     /*overflow: hidden;*/



  }






</style>






