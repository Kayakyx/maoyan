<template>
    <div id="container"></div>
</template>

<script>
    export default {
        name: "Map",
        mounted(){


           // 练习1 显示地图
           //初始化
           //这样就能在 div.container  里显示地图了。
           var map = new AMap.Map('container', {
             resizeEnable: true
           });



/*

            //练习2 获取城市信息
          //初始化
          var map = new AMap.Map('');  //不需要在容器里显示城市地图， 第一个参数要只传一个空字符串

          map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
              // 是否使用高精度定位，默认：true
              enableHighAccuracy: true,
              // 设置定位超时时间，默认：无穷大
              timeout: 10000,

              /!*
              // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
              buttonOffset: new AMap.Pixel(10, 20),
              //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
              zoomToAccuracy: true,
              //  定位按钮的排放位置,  RB表示右下
              buttonPosition: 'RB'

              *!/
            });

            geolocation.getCurrentPosition();

            //onComplete,onError都是回调函数，一个是错误是执行的，一个是成功执行的，也可以直接写成
            //AMap.event.addListener(geolocation, 'complete', function( data ){ // data是具体的定位信息 });
            //都一样，因为是 回调函数 给函数起个名和直接调用 一个道理。  调用函数的方式就是加个（）嘛，
            // 内部调用函数的地方 都是  你传进来的函数加个（）,并把它想穿出来的数据放到（）里，    即    函数（参数）。
            //所以 onComplete 传进去之后 成了 onComplete（参数），  所以写在外面的函数就调用执行了。
            // 直接写一个匿名函数 就变成了 function（你想的形参）{ 你要执行的代码 }（它传给你的参数）;

            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);

            function onComplete (data) {
              // data是具体的定位信息
              console.log(data);

            }

            function onError (err) {
              // 定位出错
              console.log(err);
              console.log('定位出错');
            }
          })

*/



/*
          //练习3 只获取获取城市信息

          //初始化
          var map = new AMap.Map('');  //不需要在容器里显示城市地图， 第一个参数要只传一个空字符串

          AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch()
            citySearch.getLocalCity(function (status, result) {
              if (status === 'complete' && result.info === 'OK') {
                // 查询成功，result即为当前所在城市信息

                console.log(result);
              }
            })
          })

*/


        }


    }
</script>

<style scoped>
    #container {
      width: 100%;
      height: calc(100vh - 100px);
    }
</style>
