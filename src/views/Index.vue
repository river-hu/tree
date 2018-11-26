<template lang="pug">
    .index
</template>
<script>
export default {
    name:"index",
    created(){
         this.$store.state.loading=false;
        setTimeout(()=>{
            this.$store.state.loading=true;
            this.$router.replace('/home')
        },2000)
    }
}
</script>
<style lang="less" scoped>
    .index{
        width: 10rem;
        margin: 0 auto;
        height: 100vh;
        background: url(http://xueersiimg.xrspy.com/tree/open.png?imageslim);
        background-size: 100% 100%;
    }
</style>

