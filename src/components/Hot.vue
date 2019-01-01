<template>

      <div class="hot" ref="hot" @scroll="getMore">
        <div class="hot_item" v-for="item,index in filmArr" @click="goDetail(index)">
            <div class="imgBox"><img :src="item.img" alt=""></div>
            <div class="infoBox">
                <h4><span>{{ item.nm }}</span><i :class="['icon', {v3dimax: item.version === 'v3d imax'}, {v3d: item.version === 'v3d'}]"></i></h4>
                <p class="score" v-if="item.globalReleased">观众评 <span>{{ item.sc }}</span></p>
                <p class="score" v-if="!item.globalReleased"><span>{{ item.wish }}</span> 人想看</p>
                <p class="star">{{ item.star }}</p>
                <p class="showInfo">{{ item.showInfo }}</p>
            </div>
            <div class="buy"><span v-if="item.globalReleased">购票</span><span v-if="!item.globalReleased" class="appointment">预约</span></div>
        </div>
        <div class="btom" ref="bt">{{word}}</div>
      </div>

</template>

<script>
    export default {
        name: "Hot",
        data(){
            return{
              word: '加载更多',
              flag: 0,  // ajax 数据请求 标志位， 避免一直触发 请求 ajax

              filmArr: [],   //请求的正在热映电影数据
              movieIdsArr: [],  //正在热映电影id

              page: 0, // 用来记录请求第几页
              rows: 12, // 每次请求到少个数据

              //用来记录 页面滚出高度，此方法依托于 keep-alive, 因为加了keep-alive(Home.vue的router-view)这里的数据会被换成，不会重置,
              //如果不想依托于keep-alive，可以储存到vuex当中（vuex是储存在内存中的，强制刷新时小时），或 存储到localStorage/sessionStorage 中（刷新也不会丢失，不建议使用，大材小用了）
              hotScrollDis: 0,

            }
        },
/*
        computed: {

          iconBg(){
            let bg = null;


            if(!this.filmArr.version) return; // 没定义

            if(this.filmArr.version === 'v3d imax'){
              bg = 'v3dimax';
            }

            if(this.filmArr.version === 'v3d'){
              bg = 'v3d';
            }


            return bg;

          }

        },*/


        mounted(){
          /*给 Home.vue 的<router-view/>包裹上<keep-alive></keep-alive>后，就不会在路由切换的的时候就不会每次都执行created和mounted钩子函数了*/
          /*如果再想判断时候进入了路由， 这是后我们可以用  加上keep-alive 后的两个钩子函数，activated(进入钩子)  和 deactivated（离开钩子），在下面演示了 */
          console.log('正在热映 mounted');


/*
            let self = this; //获取 实例 以便 混动事件内使用

            //实现滚动上拉 加载
            //添加滚动事件
            window.addEventListener('scroll', function (ev) {
                //当 window 滚动的时候
                // 滚出的距离 屏幕的高度 文档的高度
                //什么时候滚到底了   滚出的距离 + 屏幕的高度 = 文档的高度 此时说明滑到底了。

                let scrollTop = document.documentElement.scrollTop;

                //屏幕高度
                let clientHeight = document.documentElement.clientHeight;
                //文档高度

                let scrollHeight = document.documentElement.scrollHeight;

                // console.log(scrollTop,clientHeight,scrollHeight);

                //判断是否划到底了
                //给他加20px的冗余，快到底的时候开始请求数据
                if(scrollTop + clientHeight + 20 >= scrollHeight){
                    // alert('快滑到底了');
                    if(self.flag) return; //如果已经发送了请求 不动作

                    self.flag = 1;  //表示已发送数据请求

                    self.word = '正在加载中';

                    // console.log(111);

                    self.getMore1();

/!*                  //方法二： 数据截流方法解决 多次发动ajax的问题
                    self.timer = setTimeout( function () {
                        clearTieoute(self.timer);
                        if(self.timer) return;
                    },3);*!/

                }


            },false)

          */

          /*------------------请求数据-正在热映的----------------*/
/*

          this.$http.get('/api/ajax/movieOnInfoList?token=').then(function (res) {
            console.log(res);
          }).catch(function () {
            console.log('请求失败执行的函数');
          });

*/

          //初始化
          this.getMoreInit();


        },

        methods: {

          //因为 axios 返回的是promise 所以可以用  async 和 await

          //初始化 一下 页面一加载就会12条数据  请求数据
          async getMoreInit(str){

            this.word = '拼命加载中';

            //打开 加载中 提示
            this.$loading(this.$refs.hot);

            // console.log('调用');

            let data = null;
            //初始化 一下 页面一加载就会12条数据  请求数据
            if(!str){ //如果没穿具体要请求的 电影id
              // console.log('执行了吗');
               data = await this.$http.get('/api/ajax/movieOnInfoList?token=');

              //关闭 提示
              this.$loading.close();

               //储存影片id信息
              this.movieIdsArr = data.data.movieIds; //储存 正确的影片信息数据
              // console.log(this.movieIdsArr);

            }else {
               data = await this.$http.get('/api/ajax/moreComingList?token=&movieIds='+str);
               // console.log(data.data.coming)

              //关闭 提示
              this.$loading.close();

            }



            // console.log(data);
            if(data.status != 200) return; //数据请求失败 直接结束
            //console.log(data.data)

            /*
            图片路径分析：
              正确地址：
              https://p0.meituan.net/128.180/movie/5bd4ec1cded88c7cd48f0b58589bd505610552.jpg
              数据地址：
              http://p0.meituan.net/w.h/movie/5bd4ec1cded88c7cd48f0b58589bd505610552.jpg
            */
            let tempArr = [];

            //第一次和第二次请求的数据结构不一样 ，第一次数据在data.data.movieList 里，第二次在 data.data.coming 里。

            if(data.data.movieList){
              tempArr = tempArr.concat(data.data.movieList);
            }else {
              tempArr = tempArr.concat(data.data.coming);
            }


            tempArr.map(item => {
              // console.log(item.img);
              item.img = item.img.replace('http', 'https');
              item.img = item.img.replace('w.h', '128.180');

            });
            // console.log(tempArr);


            this.filmArr = this.filmArr.concat(tempArr); //储存 正确的影片信息数据

            //恢复初值
            this.word = '加载更多';
            this.flag = 0;



            //判断是否 是最后一页， 没有数据可以请求了。

            if(tempArr.length < this.rows){ //请求的数据长度小于 每页的个数是说明是最后一页了

                // console.log('到底执行了');
                this.flag = 1; // 禁止再请求后台数据
                this.word = '已经到底了'; // 提示
                //初始化 页
                this.page = 0;

            }

          },






          async getMore(){
            /*
                //方法三实现上拉加载

                //滚动事件   获取  滚出距离  屏幕高度  文档高度  的值   vue自身方法 （解构）
                let { scrollTop, clientHeight, scrollHeight } = this.$refs.hot;

                console.log(scrollTop,clientHeight,scrollHeight)

                //具体写法
                console.log(event);
                  scrollTop = event.target.scrollTop;
                  clientHeight = event.target.clientHeight;
                  scrollHeight = event.target.scrollHeight;
                  if( (scrollTop + clientHeight + 20) >= scrollHeight){
                      if(self.flag) return;  // 0  1
                      self.flag = 1;   // 1
                      self.word = "正在加载中";
                      //  self.timer = setTimeout(function () {  //
                      //    if(self.timer) return;
                            self.hsajax();
                       // },3)
                  }*/


    /*
              hsajax(){
                setTimeout()
              },
    */


    /*          getMore1(){

                //ajax  page1 row 10
                let self = this;
    /!*
                setTimeout(function () { //模拟ajax
                  console.log('数据请求返回');
                  self.flag = 0; //数据返回后  请求标志为归0；
                  self.word = '加载更多';

                  if(data.length < self.rows){  //一定是最后一页
                    self.flag = 1; // 不能在发数据请求

                    self.word = '暂无更多数据';

                  }


                },3000); *!/
              }*/



            // 上拉加载 并真正实现 请求数据


            let self = this;

            //滚动事件   获取  滚出距离  屏幕高度  文档高度  的值   vue自身方法 （解构）
            let { scrollTop, clientHeight, scrollHeight } = this.$refs.hot;

            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的，此方法依托于 keep-live-----*/

            this.hotScrollDis =  scrollTop;

            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的，此方法依托于 keep-live--end---*/



            // console.log(scrollTop,clientHeight,scrollHeight);

            //具体写法
            //console.log(event);


            if( (scrollTop + clientHeight + 20) >= scrollHeight){
              if(self.flag) return;  // 0  1
              self.flag = 1;   // 1
              self.word = "正在加载中";

/*
              //请求数据
              let data = await this.$http.get('/api/ajax/movieOnInfoList?token=');
              console.log(data);
              if(data.status == 200){  //数据请求成功
                //console.log(data.data)
                self.filmArr = self.filmArr.concat(data.data.movieList);
                console.log(self.filmArr);


                //恢复初值
                self.word = '加载更多';
                self.flag = 0;
              }

              */
              // console.log(this);  vue组建实例
            // （请求具体数据需要 把id传过去字符串形式且用逗号隔开）
              this.page++;

              let start = this.page * this.rows;  // 提取影片id 开始位置
              let end = this.page * this.rows + this.rows;  //结束位置

              // console.log(start, end);

              let getStrArr = this.movieIdsArr.slice( start, end);
                                      // 假设 请求 第1页 从0页开始的
                                      //  1 * 12   ------  24  包括开头 不包括 末尾， 刚好12条
              // console.log(getStrArr);
              // 把提取出来的 id 拼接只字符串
              let getStr = getStrArr.join(',');
              // console.log(getStr);


              this.getMoreInit(getStr); //等待调用完成

/*              //恢复初值
              self.word = '加载更多';
              self.flag = 0;
              */

              // console.log('我把到底又改成 0');


            }


          },


          //跳转详情页

          goDetail(index){
            console.log(index);
            //通过index获取到点击的电影id
            // console.log(this.movieIdsArr[index]);
            let movieID = this.movieIdsArr[index];
            //方法1： 通过url 传参 ， 配置路由的时候要， {path: '/detail/:id',name: 'Detail',component: Detail} 。 这样会出现在地址栏
            //跳转后的在组件的  this.$route 上找参数。
            // this.$router.push({path: '/detail/'+ movieID});


            //方法2： 通过path 和 query 来实现跳转并传参， 这种方式会显示在地址栏中。例如： http://localhost:8080/#/detail?id=344649， 也是在跳转 后的组件中 this.$routes 上找传得到参数。（在this.$route.query对象里）。
            // this.$router.push({path: '/detail', query: {id: movieID}});


            //方法3：使用name 和params 实现跳转方式并传参 这种方式， 不会显示在 地址栏中，也是在跳转后的在组件的  this.$route 上找参数。 （在this.$route.params对象里）
            //使用方法3时，配置路由的时候必须有name属性， {path: '/detail/:id',name: 'Detail',component: Detail}
            // this.$router.push({name: 'Detail', params: { id: movieID}});


            // 我这里使用第三种方式， 这种方式用户看不到任何传的参数。
            this.$router.push({name: 'Detail', params: {id: movieID}});


          }




        },
      //利用keep-alive 钩子函数 解决切换路由时， 滚出高度重置问题
      activated(){
        console.log('hot-activated');
        //进入时从恢复原来的滚动高度
        this.$refs['hot'].scrollTop = this.hotScrollDis;

      },

      deactivated(){
          // console.log('离开-正在热映');
          // 取refs 里的 dom 两种写法  this.$refs.hot  或者 this.$refs['hot']  在对象里 .和[] 都能取 对象的属性嘛
          // console.log(this.$refs['hot'].scrollTop);

          console.log('离开-正在热映时，滚出的高度为',this.hotScrollDis);
      }





    }
</script>

<style scoped>

    .hot{
      width: calc(100vw);
      height:  calc(100vh);
      padding: 96px 0 50px 0;
      overflow: auto;
    }

    .hot_item{
      height: 90px;
      /*margin: 8px;*/
      /*background-color: red;*/

      display: flex;
      padding: 12px 15px;

    }

    .hot_item .imgBox {
      width: 64px;
      height: 90px;
      margin-right: 12px;
    }

    .hot_item .imgBox img{
      width: 100%;
      height: 100%;
    }

    .hot_item .infoBox{
      flex: 1;
      overflow: hidden;
      font-size: 13px;
      color: #666;
    }
    .hot_item .infoBox h4{

      font-size: 17px;
      color: #333;
      font-weight: 700;

    }

    .hot_item .infoBox h4>span{
      display: inline-block;
      max-width: 138px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }


    .hot_item .infoBox h4 i.icon{
        display: inline-block;
        width: 43px;
        height: 14px;
        /*background-color: red;*/
        vertical-align: top;
        margin-left: 8px;
        background-size: contain;
        background-repeat: no-repeat;

    }


    .hot_item .infoBox h4 i.v3dimax{
      background-image: url("data:image/png;base64,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");

    }

    .hot_item .infoBox h4 i.v3d{
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAcCAYAAAAEN20fAAAAAXNSR0IArs4c6QAAA0VJREFUSA3tV1tIFGEU/mZ23F11vaTrZbNs1TIxawkSuyEWIRVU2ksEvRQFRU+91EvQmw9Rb1EQRARFVCC9iCRF201MKlRCMctN3RRb23VRd9e9TecfW2XWmdEedvOh8zJzzn/+c745t39+DkRH73evEcOBqwBXJ4qihckSTRzHjQGinROMF5tP2JycBCIU6BaBnEQ7V7LPAW4uxWgTWCT+FQgGTPJNGHiWDiWkyZVxdXyyakLrwxgGisjKoP9A4vMgxAvieYHnsHe9GdacNESiIhxuH14P/kKY3hlV5JtQSmsxYuLx6Vk4J/1wzQRj4iWfmkCyjAKaDlZidaYR/lAEOo6DXuDRWGXBpZZe+EhWU7wKDcQrUdeoFzffOZYFSBPIme1WCcStdgdefpsAT0CO2YrQuNmCQ5sK8ajrx7z/y619cHh8MOh45JsM2LY2G0dI5/rhKpxv7sHUbHheV+lFtVgpI6iksA9MTKPtiwuhiIjZcBSt/eOSHUuGQWaPRcwXjMDjD6HfNY0Hn5y49uorMgwCjm8tkukqMaoRYbk+9bhr0R6bJUuS9Y5PLVqLF3QOT2KIosTSd7tjKH5ZxqsCkWkRc7pmHTaY01Gam4ann8ekVMXrKPFObwC7rDnQU8qCkaiSiiRTTU38jnyTHuZ0vVQnzCjrpuXQzJ/aMBl0murLjkjTiwHJUG1pLi7Ulklfd+/DiKZxtphHhRuk2nL7Qpq6qhEppGI8t8OK3SXyv4M3NEMmqSCrqSuWIpNeh3JKp9PrX0oVqkC8gRD2lefhZHUxpWPBTgEBZPPFG9Bux9QUHmd3liCduuZJz+iCAZU31dT4Q1G09f/E/ooCXKmvgJ3mCKuRPWVm0N8VWvrm2jhml4H2UPjZwGPRrCrMRHZqCp4PuNAx5ImpqT5VgbAddzqHwdq4fmMetlgyJSMsLTfeDqL9u1tm9AABZsSOATbi2fx5Rh/y0emV6akxXMPd93OHhpoGyfU6DgUZRgRoaP3N+aFhctGSZkRi2kGaqiN0iCWSVIs1kU6VbK8cIHP3CyWMyZMxDBQR0Z48l2qeRDvPblo0r+S9qKafADnzzTDw0nWPblo0ox4mM03Ml+STfDMMvwErHhRiC0ymfAAAAABJRU5ErkJggg==");
    }


    .hot_item .infoBox h4 i.vopens{
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAcCAMAAAAtIK2eAAAAjVBMVEX/tQD/tQD/tgD/tQAAAAD/tAD///7/2Hz/y07/7MD/6rj/7sX/vBv/z17/35X/zVb/twn/8tX/xDf/uRD//fv/9uP/0mj/wS//viL/+u//78r/5qv/4Zn/tQT//PX/9d3/5KP/yEb/8dD/24T/z1z/xj//wSz/3pD/1nP/1G3/0WT/x0L/vyX/+Of/6LMvfBa2AAAABXRSTlPmphztAPMTpaIAAAEcSURBVDjLtdTdboIwAIbhgn5tKQgFBAXGv+Dvdv+XN7owjBADZNl70KMn5EsaSra6RrAgoulbom+wsI1ONCxOI2Q5XmOBP2A5BfItdvkE749vccFUDWCbprmbweJDxQGjLr8YhBDUEMKfmWE4sBnojdOQU2uM/V1XcFbn44ktNWOKD1T0ReE8zoYFPzhwo+WYeQnzqNPQU0OdCd7zvmqYkcRxToM4juUIP8whPmwGiqQCMPnyQZ2pBZTyib1AGqcJTt0rkhA8B4StMKWUwa+uuAfWGF/cFCyBjDwcs3uHd74v27xIATtoX7GVlUD5CRRn4JJLeBbgRQyqOmpfMDgAv+6QWnjrL/X38p20x//3p5AVdtVTsOqRWfV8fQPHkSVDHb7HRAAAAABJRU5ErkJggg== ");
    }


    .hot_item .infoBox .star{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .hot_item .infoBox .score span{

      font-weight: 700;
      color: #faaf00;
      font-size: 15px;

    }





    .hot_item .buy{
        width: 65px;
        display: flex;
        align-items: center;
    }

    .hot_item .buy span{
      display: block;
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      box-sizing: border-box;
      background-color: #f03d37;
      color: #fff;
      border-radius: 4px;
      white-space: nowrap;
      font-size: 12px;
      cursor: pointer;
    }

    .hot_item .buy span.appointment{
      background-color: #3c9fe6;
    }


    .btom{
      padding: 15px;
      line-height: 30px;
      text-align: center;
    }


</style>
