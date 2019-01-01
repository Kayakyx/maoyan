<template>
    <div class="detail" ref="detail" @scroll="detailScroll">
       <!--<Header title="毒液致命守护" flag=1 ></Header>-->
       <Header :title="detailMovie.nm" :flag="flag" ></Header>
        <!--绑定动态style 注意这种写法， 当背景图为变量时， 可以这样写-->
        <div class="detail-box"
        :style="{backgroundImage: 'url(' + detailMovie.img + ')'}">
          <div class="bg"></div>
          <div class="content">
            <div class="pic">
              <img :src="detailMovie.img" alt="">
            </div>
            <div class="text">
              <h3>{{detailMovie.nm}}</h3>
              <h4>{{detailMovie.enm}}</h4>
              <p class="grade"><span>{{detailMovie.sc}}</span>({{detailMovie.snum}}人评)</p>
              <p class="cat">{{detailMovie.cat}}</p>
              <p class="src-dur">{{detailMovie.src}}/{{detailMovie.dur}}分钟</p>
              <p class="pubDesc">{{detailMovie.pubDesc}}</p>
            </div>
          </div>
        </div>


        <div :class="{fixed: isFixed}">
          <div class="showDays" ref="showDays">
            <ul>
              <li v-for="item,index in 11" :class="{ current: index==isShow }" @click="currentClass(index)">今天12月{{item}}日</li>
            </ul>
          </div>
          <Navbar/>

        </div>





      <!--影院信息-->
      <div class="cinema-info">
          <!--<p v-for="item, index in 50">{{item}}</p>-->
        <!--注意浏览器不支持行间属性 采用驼峰命名， 所以想传newPadding 需要写成 new-padding-->
          <Cinamebody :new-padding="true"/>
      </div>

    </div>
</template>

<script>
    import BetterScroll from "better-scroll";
    import Header from "../components/Header";
    //Navbar 组件
    import Navbar from "../components/Navbar";
    // Cinamebody组件
    import Cinamebody from "../components/Cinamebody";

    export default {
      name: "Detail",
      components: {Header, Navbar, Cinamebody},
      data(){
        return {
          flag: 1,
          // title: '毒液致命守护',
          detailMovie:{},
          isShow: 0,

          isFixed: false
        }

      },
      async created(){
        // console.log(this.$route);
        let movieId = this.$route.params.id;
        // console.log(movieId);
        //发送ajax获取数据
        let data = await this.$http.get(`/api/ajax/detailmovie?movieId=${movieId}`);

        let tempDetailObj = data.data.detailMovie;

        // 把数据中img地址更换成正确的地址
        tempDetailObj.img = tempDetailObj.img.replace('http', 'https').replace('w.h','148.208');

        this.detailMovie = tempDetailObj;
        console.log(this.detailMovie);




      },

      mounted(){
        // console.log(this.$route);
        this.$nextTick(() => {

         /* betton-scroll click选项说明
          click
          类型：Boolean
          默认值：false
          作用：better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。*/

          // 在vue实例上添加 一个 scroll属性
          this.scroll = new BetterScroll('.showDays', { scrollX: true , click: true})
        });

        //动态设置ul的宽度
        //获取dom元素对象
        let oUl = this.$refs.showDays.children[0];
        let oLis = oUl.children;
        let ulW = oLis.length * oLis[0].clientWidth;
        console.log(ulW);
        oUl.style.width = ulW + 'px';


      },

      methods: {
        //日期楼梯效果即 切换激活样式
        currentClass(index){
          // console.log('aaa');
          this.isShow = index;


          //获取dom元素对象
          let oUl = this.$refs.showDays.children[0];
          let oLis = oUl.children;

          //li的宽度
          let liW = oLis[0].clientWidth;
          //点击li到ul左边的距离
          let liToLeft = oLis[index].offsetLeft;
          //点击li到ul右边的距离 (js 中可没有offsetRight 方法，别乱用哈)， ul的宽度 - 减去当前li到左边的宽度 - 当前li 自身的宽度 = 当前li 到右边的宽度
          let liToRight = oUl.clientWidth - oLis[index].offsetLeft - oLis[index].clientWidth;

          //视口的宽度
          let clientW = this.$refs.showDays.clientWidth;

          console.log(liToLeft,liW,clientW,liToRight);

          //假设被点击li 居中后 li左边的距离 到 视口左边的 距离 (视口总宽度的一半 - li宽度的一半)

          // let liToClient = clientW / 2 - liW / 2; 即
          let liToClient = (clientW - liW) / 2 ;

          console.log(liToClient);
          //想让被点击的 li 在 视口中显示居中， ul 需要滚动的距离为
          let scrollDistanceX = liToLeft - liToClient;

          //被点击的元素，要保持在视口中间（不包括两头的元素）,最开头的几个和最后的几个不用居中, 直接让ul在两头即可， 如果是左边就让
          //ul的距离为0（ul的左边贴着视口的左边），如果是在右边即结尾处，就让 ul 想左滚动到极限（ul的右边帖着视口的右边）。

          if(liToLeft + liW / 2 <= clientW / 2 ) {  //左边的情况
            this.scroll.scrollTo( 0, 0, 500); //三个参数分别为 x滚动距离， y滚动距离， 滚动过渡时间 ms
            return; //不再执行下面的代码
          };

          if(liToRight + liW / 2 <= clientW / 2 ) {  //右边的情况
            let distance = oUl.clientWidth - clientW; //ul的宽度减去视口的宽度
            this.scroll.scrollTo( -distance, 0, 500); //三个参数分别为 x滚动距离， y滚动距离， 滚动过渡时间 ms
            return;//不再执行下面的代码
          };

          //排除掉两头的情况后
          //向左移动，所以得取负值
          this.scroll.scrollTo( -scrollDistanceX, 0, 500);


        },

        //滚动事件   （.fixed 是否固定定位 ）
        detailScroll(){
          // console.log(this);
          // 解构出 scrollTop
          let { scrollTop } = this.$refs.detail;
          console.log(scrollTop);
          if(scrollTop > 200){ //滚动高度大于 200 时， 固定定位到屏幕顶部
            this.isFixed = true;
          }else if(scrollTop < 200){  //滚动高度小于于 200 时， 回到文档流中（当用户往回滑时）
            this.isFixed = false;
          }

        }





      }



    }


</script>

<style scoped>
  .detail{
    height: 100%;

    overflow: auto;
  }
  .detail-box{
    position: relative;
    display: flex;
    height: 188px;
    -webkit-background-size: 200%;
    background-size: cover;
    background-repeat: no-repeat;
    /*background-image: url(http://p1.meituan.net/71.100/movie/19efcfbf1a98c02cb5efd69a2edf766e2421917.jpg);*/

  }
  .detail-box .bg{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    /*background-color: rgba(0, 0, 0, .5);*/
  }
  .detail-box .content{
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 19px 30px 19px 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background-color: rgba(50, 50, 50, .7);

  }
  .detail-box .pic>img{
    width: 110px;
    height: 150px;
  }

  .detail-box .text{
    margin-left: 12.5px;
    flex: 1;
  }

  .text h3{
    font-size: 20px;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #fff;
  }

  .text h4{
    font-size: 12px;
    color: #fff;
    opacity: .8;
  }

  .text .grade{
    font-size: 12px;
    color: #fff;
    opacity: .8;
    margin-top: 11px;
  }

  .grade>span{
    font-size: 18px;
    font-weight: 700;
    color: #fc0;
  }

  .cat, .src-dur, .pubDesc{
    margin-top: 10px;
    font-size: 12px;
    color: #fff;
    opacity: .8;
  }


  .showDays{
    position: relative;
    height: 45px;
    overflow: hidden;
    background-color: #fff;
  }

  .showDays ul {
    position: absolute;
    left: 0;
    top: 0;
    /*width: 1265px;*/
    height: 100%;
    display: flex;
    list-style: none;

  }
  .showDays>ul>li{
    line-height: 45px;
    width: 115px;
    text-align: center;
  }

  .current{
    border-bottom: 2px solid #f03d37;
    color: #f03d37;
  }

  .cinema-info p{
    height: 100px;
    background: cyan;
    border-bottom: 2px dashed black;
  }


  .fixed{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 33;
  }





</style>
