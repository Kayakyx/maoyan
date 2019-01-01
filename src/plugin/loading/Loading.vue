<template>
  <div class="loading">
    {{msg}}
  </div>
</template>

<script>
    export default {
        name: "Loading",
        data(){
          return {
            msg: 'loading...'
          }
        }
    }
</script>

<style scoped>
    .loading{
      position: absolute;
      top: 50%;
      left: 50%;

      transform: translate(-50%, -50%);

      text-align: center;
    }
</style>
