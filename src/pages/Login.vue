<template>
    <div class="login">
     <!--
      改成Header组件
      <header class="film_title">猫眼电影</header>
      -->
      <!--传数据据 数字、数组、对象、布尔值 时，虽然传的是 死数据但是也不能 少掉 ： （冒号），变成变量， 如果不写，vue会认为这是字符串类型的。 直接传死数据字符串时，不用写：号。-->
      <!--这里这样写 flag="1", 也能实现效果、但是会报错，因为这Header组件里、规定flag是Number类型， flag="1"这样写能把传1传过去，达到效果，但是回报错，vue认为是字符串1了，所以要把 :flag="1"-->
      <!--这样传过去的就是数字 1 了-->

      <Header :flag="1"/>


      <div>
        <div class="login_input"><input type="text" v-model="tel" placeholder="请输入手机号" autocomplete="false"><button :class="[ 'auth-code-btn',{ high: isHigh } ]" :disabled="isDisabled" @click="getAuthCode">获取验证码</button></div>


        <div class="login_input"><input type="text" v-model="msg" placeholder="请输入验证码" autocomplete="false"></div>
      </div>
      <div class="login_btn" @click.stop="login">登录</div>
    </div>


</template>

<script>
    import Header from '../components/Header';

    /*
    我们想通过axios 提交FromData,需要用到qs库（这个库不用npm下载，直接引用即可），
    qs是一个url参数转化（parse和stringify）的js库。
    qs.stringify() 和JSON.stringify() 作用相似，都是序列化，但他们完全不是一个东西，
    假设我要提交的数据是：  let a = {name:'hehe',age:10};
    qs.stringify(a)序列化结果为  name=hehe&age=10
    而JSON.stringify序列化结果为： {"name":"hehe","age":10}  转成字符串

    使用 application/x-www-form-urlencoded format 使用这种请求头 发送法数据就是 FromData格式
    默认情况下，axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据，您可以使用以下选项之一。
    这里我们是采用的ES6 语法 引入 的qs模块
    */
    import qs from 'qs';

    export default {
        name: "Login",
        components: {Header},
        data(){
          return {
            tel: '',
            msg: '',
            isHigh: false, // '获取验证码'按钮是否高亮显示,
            isDisabled: true  //必须用 true 和 false 用 0 时 标签属性 disabled 并不会消失，false会。
          }
        },
      //
      // mounted(){
      //     //获取它原先想跳的 路径
      //     console.log(this.$route.query);  //{path: "/home"}  形式是这样的
      // },

      //vue监听属性
        watch:{
          // 监听 tel 的值 有变化就执行  注意这里不能写，箭头函数，写了箭头函数 this就不是 vue实例了。
          /*tel: (val)=>{
            console.log(this);
            // console.log(val);
            if( val.length >= 11 ){
              this.isHigh = true;
              console.log(this);
            },*/
          tel: function (val) {
            // console.log(this);
            // console.log(val);
            if( val.length >= 11 ){
              this.isHigh = true;
              this.isDisabled = false; //按钮可点
              // console.log(this);
            }else{
              this.isHigh = false;
              this.isDisabled = true; //按钮不可点
            }
          }


        },




        methods: {
          login(){

            // 登录成功   设置sessionStorage
            sessionStorage.setItem('isLogin', 1);
            let _self = this;
            //会跳到他原先想跳的  路径
            this.$router.push({path: _self.$route.query.path});
          },

          //获取验证码
          async getAuthCode(){
            // console.log('sss');
            // let data = await this.$http.post('https://i.meituan.com/account/custom/mobilelogincode2' + '?mobile=17664068406');
            //直接post请求及传参数
            // let data = await this.$http.post('https://i.meituan.com/account/custom/mobilelogincode2', { mobile: '17664068406'});
            // console.log(data);

            let tel = this.tel;

            //通过POST方式发送FormData格式的参数 的写法
            let data = await this.$http({
              url: 'https://i.meituan.com/account/custom/mobilelogincode2',  //请求路径（接口）
              method: 'POST', //请求方式
              headers: { 'content-type': 'application/x-www-form-urlencoded' }, // 请求头，发送FormData格式的数据，必须是 这种请求头。
              data: qs.stringify({mobile: tel}),  //发送请求要传的FormData参数。必须用 qs.stringify（）序列化一下。
            });

            console.log(data);



          }




        },

/*
        //这里的代码是为了演示  实现反向代理多个域名，解决跨域的代码。  // 详见  config/index.js
        async mounted(){
          // let data = await this.$http.post('https://i.meituan.com/account/custom/mobilelogincode2');
          let data = await this.$http.get('/baidu/search/wisejsonala?tn=wisejsonala&ie=utf8&cur=result&word=%E6%91%84%E5%BD%B1%E5%B8%88%E9%99%88%E7%A3%8A&fr=&catename=&pn=0&rn=3&gsm=1e000000001e');

          console.log(data);
        }

*/


    }
</script>

<style scoped>


  .login{
    width: 100%;
    height: 100%;
  }
  .film_title{
    line-height: 50px;
    background-color: #e54847;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
  }

  .login_input{
    height: 44px;
    border-bottom: 1px solid #d6d6d6;

    margin: 15px;

    display: flex;
  }

  .auth-code-btn{
    width: 100px;
    height: 36px;
    background-color: #dcdcdc;
    color: #999;
    border: 0;
    border-radius: 4px;
    outline: none;
  }


  .high{
    border: 1px solid #df2d2d;
    background: #fff;
    color: #df2d2d;
  }


  .login_input input{
    display: inline-block;
    /*width: 100%;*/
    flex: 1;
    font-size: 18px;
    height: 44px;
    outline: 0 none;
    border: 0 none;
  }
  .login_btn{
    background-color: #dcdcdc;
    /*color: #999;*/
    line-height: 50px;
    text-align: center;
    letter-spacing: 10px;
    border-radius: 6px;
    color: red;
    font-size: 22px;
    margin: 15px ;
  }</style>
