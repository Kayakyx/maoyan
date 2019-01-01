<template>
  <div class="My">
    {{msg}}
  </div>
</template>

<script>
    export default {
        name: "My",
        data(){
          return {
            msg: 'MyVue'
          }
        }
    }
</script>

<style scoped>
  .My{
    width: 100%;
    height: 100%;
    background-color: red;
  }
</style>
