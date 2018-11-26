<template>
  <div id="app">
    <loading v-if="$store.state.loading"></loading>
    <router-view/>
  </div>
</template>
<script>
import loading from './components/Loading.vue'
export default {
  name:"app",
  components:{
    loading
  },
  created(){
     window.scrollTo(0,100);
     let u = navigator.userAgent;
     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
     if(isiOS){
       this.$store.state.isios = window.location.href;
     }
  }
}
</script>


<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 750px;
  margin: 0 auto;
}
body{
  margin: 0;
  padding: 0; 
}
</style>
