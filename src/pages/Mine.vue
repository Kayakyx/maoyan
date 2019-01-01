<template>
    <div class="mine">Mine</div>
</template>

<script>
    export default {
        name: "Mine",
/*
      //方法一
        //判读是否登录
      mounted(){
          let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
          if(!isLogin){
              this.$router.push('/login');
          }

      }*/


/*      //组件内守卫
      beforeRouteEnter(to, from, next){
          //console.log(to);
          // console.log(from);
/*
          这样写报错
          //找不到 this 对象

          let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));

          if(!isLogin){
              // this.$router.push('/login');
          }else{

              next();
          }

          //解决方法： next 中找 vm  , 把vm搞成箭头函数即可

          next(vm=>{
            // vm就是this
            let isLogin = JSON.parse(sessionStorage.getItem('isLogin'));
            if(!isLogin){
              vm.$router.push({path: '/login', params:{to: to}});
            }else{

              next();
            }

          })



      }*/

      mounted(){
        /*给 Home.vue 的<router-view/>包裹上<keep-alive></keep-alive>后，就不会在路由切换的的时候就不会每次都执行created和mounted钩子函数了*/
        /*如果再想判断时候进入了路由， 这是后我们可以用  加上keep-alive 后的两个钩子函数，activated(进入钩子)  和 deactivated（离开钩子），在下面演示了 */
        console.log('mine页mounted，加了keep-alive后我就执行一次了');
      },

/*
      activated(){
        console.log('进入mine');
      },
      deactivated(){
        console.log('离开mine');
      }
*/






    }
</script>

<style scoped>

</style>
