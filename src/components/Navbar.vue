<template>
    <div class="navbar">

      <div class="nav-wrap">
        <div class="sup_nav">
          <span v-for="item,index in navArr" :class="{ on: isShow == index }" @click="tab(index)">{{ item }}<i class="fa fa-sort-desc"></i></span>
        </div>
        <div class="sub">
          <div class="allcity item" v-show="isShow == 0">全城</div>
          <div class="brand item" v-show="isShow == 1">品牌</div>
          <div class="feature item" v-show="isShow == 2">特色</div>
        </div>

      </div>

    </div>


</template>

<script>
    export default {
        name: "Navbar",

        data(){
          return{
            isShow: -1,
            navArr: ['全城','品牌','特色'],
          }
        },

        methods: {
          tab(index){
            //判断现在是否已经显示了
            if(index == this.isShow){
              this.isShow = -1;
              return;
            }
            this.isShow = index;

          },
        }


    }
</script>

<style scoped>

  .nav-wrap{
    height: 40px;

    border-bottom: 1px solid #f5f5f5;
    background-color: #fff;

    position: relative;

  }

  .sup_nav{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .nav-wrap span{
    flex: 1;
    text-align: center;
    line-height: 40px;
    font-size: 13px;
  }

  .nav-wrap span:nth-child(2){
    border-left: 1px solid #f5f5f5;
    border-right: 1px solid #f5f5f5;
  }

  .on{
    color: #e54847;
  }
  .on i{
    transform: rotate(-180deg);

  }

  .nav-wrap span i{
    vertical-align: baseline;
  }

  .sub{
    position: absolute;
    background-color: #f5f5f5;
    z-index: 22;
    width: 100%;
  }


  .sub .item{
    width: 100%;
    height: 300px;
    background-color: #f5f5f5;
  }

</style>
