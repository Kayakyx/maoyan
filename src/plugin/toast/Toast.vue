<template>
  <div class="toast">
    {{msg}}
  </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
          return {
            msg: 'aaa'
          }
        }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 10px;
    background-color: rgba(0,0,0,0.3);
    color: #ffffff;
    transform: translate(-50%,-50%);
  }
</style>
