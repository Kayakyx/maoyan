<template>

  <div :class="['Cinamebody', {padding: newPadding}]" @scroll="handleScroll" ref="cinamebody">
    <!--<p v-for="index in 50">aljfaljflajflaj</p>-->


    <div class="item mb-line-b" v-for="item,index in cinemaListArr">

      <div class="title-block box-flex middle">
        <div class="title line-ellipsis">
          <span>{{item.nm}}</span>

          <span class="price-block">
                <span class="price">{{item.sellPrice}}</span><span class="q">元起</span>
          </span>

        </div>
        <div class="location-block box-flex">
          <div class="flex line-ellipsis">{{item.addr}}</div>

          <div class="distance">{{item.distance}}</div>

        </div>
        <div class="flex"></div>

        <div class="label-block">

          <div class="allowRefund" v-if="item.tag.allowRefund">退</div>

          <div class="endorse" v-if="item.tag.endorse">改签</div>

          <div class="snack" v-if="item.tag.snack">小吃</div>

          <div class="vipTag" v-if="item.tag.vipTag">折扣卡</div>

          <div class="hallType" v-for="item1 in item.tag.hallType">{{item1}}</div>

        </div>

        <div class="discount-block" v-if="item.promotion.cardPromotionTag">

          <div class="discount-label normal card">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAeCAYAAABNChwpAAAAAXNSR0IArs4c6QAAAgFJREFUSA3Nlz1LA0EQhmf3kouFEQwi+FEYQ+xEsImFoCDoL/CLaKd/QbC0sbCzFVuxsRS1jEVAsUqrIILRQAhaBGKMuawzwpGAm83mNhddCHfZnd3n3Z2ZuxsG2JI3YtQpVw6AiTkhYJj6/GqMwSsIdm312DsnMyzLCF79rGRAiIhfUOm6jL0FQvZU4Gfn0GU4KcINE5vjsc9LFXajE9kcfT7UDZaMQWwuG9Dpi/YyiIWZjqnSxrOAtWgANsYDysV1Bj0L0Flcx8ZoC1F0wf50UMo5fqjCY1FIxxo7jQSUHWgK+ag2YprfGwnIlQTQTk3a/46B2UEOIUu+v0gIIMgZLLTIZHJTOl+TL4K9ShckMc36Q+pc356QB6FLLJQFCqi4f39d2WoKLTy03ckg2OjAvcyXh9n1KX8eA0YC4n0MtuLoJru+o3bvjAS8o2vpfXCYsGEzZkFYHQ5SbcoglM5o6KQAoxhIDHBYiVqYERZcZB04f3aghNGv04wEuIDbQg3u8Lc4YsHymAVLeD17cuDypbWKjgggIZTpVwhM5x1YxzdlpaaXXB0T4J5GEbPy6F7/8WwUhC7U5OpZgIPfU5qnrNTn+UmoXLWNQc8n0AZDacqxUskpLXwcJDbHMinlI0O9NLI51WiAZZLa0odRZBKbU4FINRoDdtoNdxCDWMQk9jePWpE8hVOLbwAAAABJRU5ErkJggg==" alt="">
          </div>
          <div class="discount-label-text">{{item.promotion.cardPromotionTag}}</div>

        </div>


      </div>

    </div>





  </div>
</template>

<script>
  /*
    【注】 记录滚出高度推荐使用 方法2，配合keep-alive 方法中的， 因为这种方法 数据会被缓存， 每次切换路由的时候，不用再次
    发送axios  数据请求了。
    方法1：是用vuex来实现的 ，也能达到效果，但是每次切换路由，再切回的时候，就会重新执行 created/mounted 重新方法请求。
    如果，页面不用方式 数据请求，这种方法也是不错的。

    此页展示的是 方法2  ，如果想看  方法2的效果 注释掉方法1的代码，打开方法2 的代码，然后在 Home.vue里，再打开 方法2的代码即可

  */

  /*------------方法1：（vuex的方法记录滚出高度的  代码）---------------------*/
    // import { mapState, mapActions } from "vuex"
  /*------------方法1：（vuex的方法记录滚出高度的  代码）--end-------------------*/


    export default {
        name: "Cinamebody",
        data(){

          return{
            cinemaListArr: [],
            flag: false,

            //方法2： 使用keep-alive 缓存此组件的代码
            cBscrDis: 0,  //记录页面滚出的高度

          }

        },


      /*------------方法1：（vuex的方法记录滚出高度的  代码）---------------------*/

        // computed: {
        //   ...mapState(['cBscrollDis'])
        // },

      /*------------方法1：（vuex的方法记录滚出高度的  代码）---end------------------*/



/*

        created(){
          // console.log(this);
          this.setcBscrollDis(900);
        },

*/


       /* updated(){
          console.log(this);
        },*/
       //通过组件传来的数据
        props:{
          newPadding: {
            type: Boolean,
            default: false
          }

        },

        methods: {

          async listInit(){
            //打开 加载中 提示
            this.$loading(this.$refs.cinamebody);

            let data = await this.$http.get('/api/ajax/cinemaList?day=2018-12-08&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1544238642366&cityId=60');

            //关闭 提示
            this.$loading.close();

            // console.log(data.data.cinemas);
            this.cinemaListArr = data.data.cinemas;
            // console.log( this.cinemaListArr);

            // console.log('init函数');


          },



          async handleScroll(){

            let {scrollTop,clientHeight,scrollHeight} = this.$refs.cinamebody;

            // console.log(scrollTop,clientHeight,scrollHeight);


            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的-----*/

            // this.setcBscrollDis(scrollTop); //方法1：把滚出高度存到 vuex当中

            this.cBscrDis= scrollTop; //方法2： 使用keep-alive 缓存此组件的代码

            /*-----这里的代码是 为了解决路由切换，滚出高度重置bug的--end---*/



            let self = this;

            if(scrollTop + clientHeight + 20 >= scrollHeight){
              if(self.flag) return;
              self.flag = true;
              console.log('到低了');

              let data = await this.$http.get('/api/ajax/cinemaList?day=2018-12-08&offset=0&limit=20&districtId=-1&lineId=-1&hallType=-1&brandId=-1&serviceId=-1&areaId=-1&stationId=-1&item=&updateShowDay=true&reqId=1544238642366&cityId=60');
              // console.log(data.data.cinemas);
              this.cinemaListArr.concat(data.data.cinemas);

              self.flag = false;

            }


          },

        /*------------方法1：（vuex的方法记录滚出高度的  代码）---------------------*/

          // ...mapActions(['setcBscrollDis'])

        /*------------方法1：（vuex的方法记录滚出高度的  代码）--end-------------------*/

        },
/*

        //最开始的  mounted 代码
        mounted(){

          this.listInit();


        },

*/

      /*------------方法2： 使用keep-alive 缓存此组件的代码------------*/
      mounted(){

        this.listInit();

      },

      /*------------方法2： 使用keep-alive 缓存此组件的代码--end-------*/



      /*------------方法1：（vuex的方法记录滚出高度的  代码）---------------------*/


      //方法1：（vuex的方法记录滚出高度的  代码）已解决  路由切换滚动高度重置的 代码
/*
      async mounted(){

        //console.log(this.listInit()); //返回的 Promise {<pending>} ， 需要等待 它完成， 不然页面数据没有渲染， 页面高度为 0 ，没法设置 scrollTop,滚不上去

        await this.listInit();  //等待调用完成

        //解决路由切换，滚动高度重置问题方法二 ： （存vuex）

        /!*给 Home.vue 的<router-view/>包裹上<keep-alive></keep-alive>后，就不会在路由切换的的时候就不会每次都执行created和mounted钩子函数了*!/
        /!*如果再想判断时候进入了路由， 这是后我们可以用  加上keep-alive 后的两个钩子函数，activated(进入钩子)  和 deactivated（离开钩子） *!/

        // 如果把 keep-alive 去掉，可以如下 这样写

        //恢复原来滚动的高度

        // console.log(this.cBscrollDis);
        // this.$refs.cinamebody.scrollTop = 500
        this.$refs['cinamebody'].scrollTop = this.cBscrollDis;


      },
 */

      /*------------方法1：（vuex的方法记录滚出高度的  代码）----end-----------------*/


      /*------------方法2： 使用keep-alive 缓存此组件的代码------------*/
      //使用keep-alive 后多出的两个钩子

      activated(){
        console.log('activated--进入Cinamebody');

        this.$refs.cinamebody.scrollTop = this.cBscrDis;

      },
      deactivated(){
        console.log('deactivated--离开Cinamebody页面滚出距离为',this.cBscrDis);
      }


      /*------------方法2： 使用keep-alive 缓存此组件的代码---end------*/


    }
</script>

<style scoped>

  /*把Cinemabody样式，拆分成两个样式 padding 和 Cinamebody*/

  /* 原样式
  .Cinamebody{

    padding-top: 135px;
    padding-bottom: 50px;


    /*vue 滚动事件绑定的元素必须必须给定宽高（不能用%数，%是继承不是给定），和 overflow: hidden *！/
    width: calc(100vw);
    height: calc(100vh - 135px - 50px);
    overflow: auto;
  }

  */

  /*方便组件复用修改的样式*/
  /*根据需求决定要不要padding*/

  .Cinamebody{

    padding-top: 135px;
    padding-bottom: 50px;

    /*vue 滚动事件绑定的元素必须必须给定宽高（不能用%数，%是继承不是给定），和 overflow: hidden */
    width: calc(100vw);
    height: calc(100vh - 135px - 50px);
    overflow: auto;
  }

  .padding{
    /*取消padding*/
    padding-top: 0px;
    padding-bottom: 0px;
    /*覆盖掉.Cinamebody的height值，这样就不能滚动了*/
    height: auto;
  }




 .item {
    /*height: 98px;*/
   padding: 13px 15px 13px 0px;
   margin-left: 15px;
   margin-right: 15px;
   border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .item .title {
    height: 23px;
    line-height: 23px;
    font-size: 16px;
    color: #000;
  }

  .price-block {
    padding-top: 9px;
    padding-left: 3px;
    color: #f03d37;
  }

  .price-block .price {
    font-size: 18px;
  }

  .location-block{
    display: flex;
  }

  .flex {
    -webkit-box-flex: 1;
    flex: 1;
  }

  .line-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .location-block {
    margin-top: 6px;
    font-size: 13px;
    color: #666;
  }
  .label-block {
    height: 17px;
    line-height: 17px;
    margin-top: 4px;
    margin-bottom: 4px;
    overflow: hidden;
    /*font-size: 0;*/
    flex-shrink: 0;
    display: flex;
  }

  .label-block>div{
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    font-size: 12px;
  }

  .label-block>div:not(:first-child){
    margin-left: 5px;
  }

  .snack, .vipTag{
    color: #f90;
    border: 1px solid #f90;
  }

  .allowRefund, .endorse, .hallType{
    color: #589daf;
    border: 1px solid #589daf;
  }

  .discount-block{
    display: flex;

  }


  .discount-label {
    width: 15px;
    height: 14px;
    /*align-self: center;*/
    margin-right: 4px;
  }
  .discount-label img{
    width: 100%;
    height: 100%;
  }

  .discount-label-text {
    margin-left: 0;
    font-size: 11px;
    color: #999;
  }


</style>
