<template lang="pug">
.test
 button(@click="get") 请求数据
    
</template>
<script>
export default {
  name: "test",
  methods: {
    get() {
       this.$cookies.remove("token");
       this.$cookies.remove("data");
    }
  },
  created() {
    this.$store.state.loading=false;
//       this.$store.
//       this.wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'asdas', // 必填，公众号的唯一标识
//     timestamp: "asdas", // 必填，生成签名的时间戳
//     nonceStr: 'asd', // 必填，生成签名的随机串
//     signature: 'asda',// 必填，签名
//     jsApiList: [] // 必填，需要使用的JS接口列表
// });
  
  }
};
</script>
<style lang="less" scoped>
.test {
  border: 5px solid #ccc;
  button {
    margin: 5px;
  }
}
</style>


