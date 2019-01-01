<template>
  <div id="app">
    <!--这里 的keep-alive 换成大 页， search 页， detail 页， 这里 主页是解决  进入详情页  返回后， 不能记录滚动高度   的问题
        但是这里 不能 缓存 Detail 页， 因为这也的数据，是根据 路由传来的 电影 id 每次都得请求的。
    -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>


  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

#app {
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;*/

  width: 100%;
  height: 100%;

}
</style>
