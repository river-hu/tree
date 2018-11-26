<template lang="pug">
  .grow
    .img( v-if='!off' :class="{['img'+state]:true}")
    .img( v-if='off' :class="{['active'+state]:true}")
    .title 感谢您的照顾，我长大啦！
      .triangle

</template>
<script>
export default {
  name: "grow",
  data() {
    return {
      off: false,
      state: ""
    };
  },
  created() {
    let token = this.$store.state.token;
    this.$api.wxpost("/index/total", { token }, res => {
       this.$store.state.loading = false;
      let arr = [2888,7888,12888,18888];
      for (let i = 0; i < 4; i++) {
        if (res.data - arr[i] < 0) {
          this.state = i-1;
          break;
        }
        this.state = i;
      }
      setTimeout(() => {
        this.off = true;
        setTimeout(() => {
          this.$store.state.loading = true;
          this.$router.replace("/home");
        }, 1000);
      }, 5900);
    });
  }
};
</script>
<style lang="less" scoped>
.grow {
  width: 100vw;
  height: 100vh;
  background: url(http://xueersiimg.xrspy.com/tree/bg.png?imageslim);
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  .img {
    position: absolute;
    width: 8rem;
    height: 8rem;
    bottom: 15%;
    left: 50%;
    margin-left: -4rem;
    box-sizing: border-box;
    transform: scale(0.3, 0.3);
    transform-origin: 50% 100%;
    transition: all 2s linear;
  }
  .img0 {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree0.png);
    background-size: 100% 100%;
    animation: test 5s linear;
    animation-delay: 1s;
  }
  .img1 {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree1.png);
    background-size: 100% 100%;
    animation: test1 5s linear;
    animation-delay: 1s;
  }
  .img2 {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree2.png);
    background-size: 100% 100%;
    animation: test2 5s linear;
    animation-delay: 1s;
  }
  .img3 {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree3.png);
    background-size: 100% 100%;
    animation: test3 5s linear;
    animation-delay: 1s;
  }
  .active0 {
    animation: none;
    transform: scale(1, 1);
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree1.png);
    background-size: 100% 100%;
  }
  .active1 {
    animation: none;
    transform: scale(1, 1);
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree2.png);
    background-size: 100% 100%;
  }
  .active2 {
    animation: none;
    transform: scale(1, 1);
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree3.png);
    background-size: 100% 100%;
  }
  .active3 {
    animation: none;
    transform: scale(1, 1);
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree4.png);
    background-size: 100% 100%;
  }
  .title {
    position: absolute;
    width: 70%;
    left: 15%;
    padding: 0.25rem;
    box-sizing: border-box;
    border-radius: 0.106667rem;
    font-size: 0.4rem;
    text-align: center;
    top: 10%;
    background: #fff;
    .triangle {
      width: 0;
      height: 0;
      position: absolute;
      bottom: -0.38rem;
      left: 0.6rem;
      border: 0.2rem solid transparent;
      border-top-color: #fff;
    }
  }
}

@keyframes test {
  0% {
    transform: scale(0.3, 0.3);
  }
  99% {
    transform: scale(1, 1);
  }
  100% {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree1.png);
    background-size: 100% 100%;
  }
}
@keyframes test1 {
  0% {
    transform: scale(0.3, 0.3);
  }
  99% {
    transform: scale(1, 1);
  }
  100% {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree2.png);
    background-size: 100% 100%;
  }
}
@keyframes test2 {
  0% {
    transform: scale(0.3, 0.3);
  }
  99% {
    transform: scale(1, 1);
  }
  100% {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree3.png);
    background-size: 100% 100%;
  }
}
@keyframes test3 {
  0% {
    transform: scale(0.3, 0.3);
  }
  99% {
    transform: scale(1, 1);
  }
  100% {
    background: url(http://xueersiimg.xrspy.com/tree/tree/tree4.png);
    background-size: 100% 100%;
  }
}
</style>

