<template>
    <div class="plugin">
        <Header title="展示Vue插件页" :flag="1"/>

        <div class="myTest" ref="myTest"></div>
        <button @click.stop="show" >显示toast插件</button>
        <button @click.stop="show2" >显示my插件</button>
        <button @click.stop="show3" >点击加载数据-显示loading插件</button>

    </div>
</template>

<script>
    import Header from '../components/Header';
    export default {
        name: "Plugin",
        components: { Header },

        data(){
          return {
            isReq: false, //  是否在发送 数据请求 标志位
          }
        },

        methods: {
          show(){
            this.$toast('这里是vue插件展示页');
          },
          show2(){
            // console.log(this.$refs);
            this.$My('这里是Plugin局部局部', this.$refs.myTest);
          },
          show3(){

            if( this.isReq ) return;

            // this.$loading(); //不传 在指定dom中显示loading
            this.$loading(this.$refs.myTest);
            // console.log(this);
            this.isReq = true;
            //模拟请求数据：
            setTimeout( ()=>{    //箭头函数的this指向当前组件， 如果改成function会指向Windows.setTimeout是window方法。
              //数据请求成功后关闭 loading 提示或请求中图片提示

              this.$loading.close();
              this.isReq = false;
            }, 3000)
          }
        }


    }
</script>

<style scoped>
  .ciname{
    width: 100%;
    height: 100%;
  }

  .myTest{
    width: 100%;
    height: 50px;
    position: relative;
  }
</style>
