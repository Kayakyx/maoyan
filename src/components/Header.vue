<template>
    <div class="header">
        <span class="header_span" v-if="flag" @click="back"><i class="fa fa-angle-left" aria-hidden="true"></i></span>
        <div :class="{ header_title: true, on: flag}">{{title}}</div>
    </div>
</template>

<script>
    export default {
        name: "Header",
      //props 不仅能用 数组形式接 参数 也可以 使用对行 对参数进行相应的设置
        props: {
            title: {
               type: String, //属性的类型
               required: false, //// true 必须传 false 不是必须传递的
               default: '猫眼电影'// 默认值
            },
/*
            flag: {
              type: Number,   //属性的类型
              required: false,  // true 必须传 false 不是必须传递的
              default: 0 //默认值
            },
   */

            flag: {
              type: Number,   //属性的类型
              required: false,  // true 必须传 false 不是必须传递的
              default: 0 //默认值
            }




        },

        methods: {
            back(){
              this.$router.go(-1);
            }
        }


    }
</script>

<style scoped>
  .header{
    width: 100%;
    line-height: 50px;
    background-color: #e54847;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    display: flex;
  }

  .header_span{
    display: inline-block;
    width: 50px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    font-size: 22px;
  }

  .header_title{
    flex: 1;
  }

  .header_title.on{
    margin-right: 50px;
  }


</style>
