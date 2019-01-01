<template>
    <div class="soon_sub">

        <div class="hot_item" v-for="item, index in filmArr">
            <h4 ref="h4">{{ item.comingTitle }}</h4>

            <section>

                <div class="imgBox"><img :src="item.img" alt=""></div>
                <div class="infoBox">
                    <h4><span>{{ item.nm }}</span><i :class="['icon', {v3dimax: item.version === 'v3d imax'}, {v3d: item.version === 'v3d'}]"></i></h4>
                    <p class="score" v-if="item.globalReleased">观众评 <span>{{ item.sc }}</span></p>
                    <p class="score" v-if="!item.globalReleased"><span>{{ item.wish }}</span> 人想看</p>
                    <p class="star">主演：{{ item.star }}</p>
                    <p class="showInfo">{{ item.rt }}上映</p>
                </div>
                <div class="buy"><span v-if="item.showst === 1 ">想看</span><span v-else class="appointment">预售</span></div>

            </section>


        </div>
        <div class="btom" ref="bt">{{word}}</div>

    </div>
</template>

<script>
    export default {
        name: "Soonsub",

        data(){
          return{
            // word: '加载更多',
            // flag: 0,  // ajax 数据请求 标志位， 避免一直触发 请求 ajax

            filmArr: [],   //请求的正在热映电影数据
            movieIdsArr: [],  //正在热映电影id

          }
        },

        props: ['flag', 'page', 'rows', 'word'],

        mounted(){

            // console.log(this.flag);

            this.getMoreInit();
        },



        methods: {



          //因为 axios 返回的是promise 所以可以用  async 和 await

          //初始化 一下 页面一加载就会10条数据  请求数据
          async getMoreInit(str){

            // console.log('调用');

            let data = null;
            //初始化 一下 页面一加载就会12条数据  请求数据
            if(!str){ //如果没穿具体要请求的 电影id
              // console.log('执行了吗');
              data = await this.$http.get('/api/ajax/comingList?ci=60&token=&limit=10');
              //储存影片id信息
              this.movieIdsArr = data.data.movieIds; //储存 正确的影片信息数据
              // console.log(this.movieIdsArr);

            }else {
              data = await this.$http.get('/api/ajax/moreComingList?ci=60&token=&limit=10&movieIds='+str);
              // console.log(data.data.coming)
            }


            /*
            图片路径分析：
              正确地址：
              https://p0.meituan.net/128.180/movie/5bd4ec1cded88c7cd48f0b58589bd505610552.jpg
              数据地址：
              http://p0.meituan.net/w.h/movie/5bd4ec1cded88c7cd48f0b58589bd505610552.jpg
            */
            let tempArr = [];

            tempArr = tempArr.concat(data.data.coming);



            tempArr.map(item => {
              // console.log(item.img);
              item.img = item.img.replace('http', 'https');
              item.img = item.img.replace('w.h', '128.180');

            });
            // console.log(tempArr);


            this.filmArr = this.filmArr.concat(tempArr); //储存 正确的影片信息数据

            //恢复初值
            this.$emit('update:word', '加载更多');

            this.$emit('update:flag', 0); //修改父元素的  是否发送数据请求标志为

            // this.flag = 0;



            //判断是否 是最后一页， 没有数据可以请求了。

            if(tempArr.length < this.rows){ //请求的数据长度小于 每页的个数是说明是最后一页了

              // console.log('到底执行了');
              this.$emit('update:flag', 0); // 禁止再请求后台数据

              this.word = '已经到底了'; // 提示
              //初始化 页
              this.$emit('update:page', 0);

            }

          },



        },

        updated(){

          // console.log(this.$refs.h4);
          //获取所有的标题（上映日期），判断 如果后一个上映日期和上一个相同，就不在页面显示了。
          //少循环一次，最后一个已经和倒数第二个比过来。
          let ulArr = this.$refs.h4;

          for(let i = 0; i < ulArr.length - 1; i++){

            if(ulArr[i + 1].innerText == ulArr[i].innerText){
                // console.log(i+ 1);
                ulArr[i+1].remove();  //移除相同

            }

          }





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
    min-height: 90px;
    /*margin: 8px;*/
    /*background-color: red;*/

    /*display: flex;*/
    padding: 12px 15px;

  }

  .hot_item h4 {
    padding-bottom: 10px;
    margin: 0;
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }

  .hot_item section{
    display: flex;
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
    background-color: #faaf00;
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
