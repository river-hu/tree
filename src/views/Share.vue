<template lang="pug">
.share
  .share1#can
    .box
      img.header(:src="data.img_url")
      .nickname {{data.nick_name}}
      .message {{data.message}}
      .rank
        .tbox
          .title 你的能量
          .numa {{data.devote}}
        .tbox
          .title 你的排名
          .numa {{data.rank}}名
      .text 感恩之名，终身之计，在于树人。上海学而思以感恩为养料共同培育感恩大树，结草及衔环，饮水知思源，每一份成长都离不开关注和呵护。参加上海学而思“感恩树人”活动，勿忘感恩，温暖前行。
      .n-title 距离上海学而思认领感恩大树还差
      .num 
        .number(v-for="v in number") {{v}}
        .text 能量值
      .bottom 
        img(src="http://xueersiimg.xrspy.com/tree/tree4.png?imageslim" alt="感恩大树" ).tree
        .b-text 
          span.span 邀你与我一起 
          br
          span 感恩同行,为爱赋能
        img(src='../assets/code.png' alt="感恩地址").code
      .logo
        img(src='../assets/logo.png')
  .share2(ref='home')
    img#img(ref='img' :src='src')
  .bottom0.
    #[i.img] 长按上方图片保存专属邀请海报
</template>
<script>
import himg from "html2canvas";
let wx = require("weixin-js-sdk"); //引入微信jssdk文件
export default {
  name: "share",
  data() {
    return {
      data: {},
      number: "",
      src: ""
    };
  },
  mounted() {
    this.$auth(() => {
      let url = this.$store.state.isios;
      this.$api.wxpost(
        "/index/share",
        {
          token: this.$store.state.token,
          openid: this.$store.state.data.openid,
          url: url==''?"http://grateful.xrspy.com/share":url
        },
        res => {
          this.data = res.data;
          let sign = res.data.signature_info;
          wx.config({
            debug: false,
            appId: this.$api.APPID, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: sign.timestamp, // 必填，生成签名的时间戳
            nonceStr: sign.nonceStr, // 必填，生成签名的随机串
            signature: sign.signature, // 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(() => {
            this.data.img_url = this.data.img_url.replace(
              "http://thirdwx.qlogo.cn",
              window.location.origin + "/wechat_image"
            );
            let num = 18888 - this.data.grateful_total;
            num = num<0?0:num;
            let str = num.toString();
            this.number = str.padStart(5, '0');
            himg(document.querySelector("#can"), {
              // allowTaint: true,
              useCORS: true,
              logging: true
            }).then(canvas => {
              this.$store.state.loading = false;
              this.$refs.home.appendChild(canvas);
              this.src = canvas.toDataURL("image/png");
            });
    
            wx.onMenuShareTimeline({
              title: res.data.nick_name+"邀请您一起浇灌学而思感恩大树", // 分享标题
              link: window.location.origin + "?CKTAG=shxes.pyq", // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: "http://xueersiimg.xrspy.com/tree/share_logo.png", // 分享图标
              success: function() {
                MtaH5.clickShare("wechat_moments"); //这里加上h5分享代码
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
            wx.onMenuShareAppMessage({
              title: res.data.nick_name+"邀请您一起浇灌学而思感恩大树", // 分享标题
              desc: "每一次感恩，都有力量。", // 分享描述
              link: window.location.origin + "?CKTAG=shxes.py", // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: "http://xueersiimg.xrspy.com/tree/share_logo.png", // 分享图标
              type: "", // 分享类型,music、video或link，不填默认为link
              dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
              success: function() {
                MtaH5.clickShare("wechat_friend"); //这里加上h5分享代码
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        }
      );
    });
  }
};
</script>
<style lang="less" scoped>
.share {
  background: #e0e0e0;
  max-width: 10rem;
  width: 100vw;
  height: 100vh;
  min-height: 175vw;
  position: absolute;
  left: 0;
  top: 0;
  .share2 {
    width: 100%;
    height: calc(100vh - 0.853333rem);
    min-height: calc(175vw - 0.853333rem);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    #img {
      width: 100%;
      position: absolute;
      top: 0;
      z-index: 9999;
    }
  }
  .share1 {
    width: 100%;
    height: calc(100vh - 0.853333rem);
    min-height: calc(175vw - 0.853333rem);
    position: absolute;
    left: 0;
    top: 0;
    background: url(http://xueersiimg.xrspy.com/tree/share.png?imageslim);
    background-size: 100% 100%;

    .box {
      width: 8.586667rem;
      background: #fff;
      height: 13.506667rem;
      margin: 2.04rem auto 0;
      border-radius: 0.22rem;
      position: relative;
      box-sizing: border-box;
      padding-top: 2.106667rem;
      box-shadow: 0.08rem 0.08rem 0.5rem #555;
      .header {
        width: 2.8rem;
        height: 2.8rem;
        border: 0.08rem solid #fff;
        position: absolute;
        left: 50%;
        margin-left: -1.4rem;
        top: -1.44rem;
        border-radius: 50%;
      }
      .nickname {
        margin: 0 auto;
        font-size: 0.453333rem;
        line-height: 0.453333rem;
        font-weight: bold;
        text-align: center;
      }
      .message {
        margin: 0 auto;
        margin-top: 0.23rem;
        font-size: 0.34rem;
        line-height: 0.4rem;
        text-align: center;
        width: 80%;
        height: 0.8rem;
        font-weight: bold;
      }
      .rank {
        margin-top: 0.3rem;
        text-align: center;
        .tbox {
          display: inline-block;
          height: 1.333333rem;
          width: 3.866667rem;
          .title {
            font-size: 0.306667rem;
            line-height: 0.306667rem;
            text-align: center;
            margin-bottom: 0.2rem;
          }
          .numa {
            font-size: 0.666667rem;
            line-height: 0.666667rem;
            font-weight: bold;
            color: rgb(48, 191, 109);
            text-align: center;
            overflow: hidden;
          }
        }
      }
      .text {
        height: 0.6rem * 4;
        width: 7.066667rem;
        line-height: 0.6rem;
        font-size: 0.306667rem;
        margin: -0.1rem auto 0.266667rem;
      }
      .n-title {
        margin-top: 0.4rem;
        text-align: center;
        font-size: 0.306667rem;
        line-height: 0.306667rem;
      }
      .num {
        height: 1.2rem;
        margin-top: 0.24rem;
        text-align: center;

        .number {
          display: inline-block;
          width: 0.8rem;
          height: 1.04rem;
          border: 0.053333rem solid rgb(152, 238, 0);
          background: rgb(236, 252, 205);
          box-sizing: border-box;
          text-align: center;
          color: rgb(48, 191, 109);
          font-weight: bold;
          font-size: 0.666667rem;
          line-height: 1.013333rem;
          margin-right: 0.24rem;
        }
        .text {
          display: inline-block;
          width: 1.066667rem;
          text-align: center;
          font-size: 0.32rem;
          position: relative;
          bottom: -0.25rem;
        }
      }
      .bottom {
        margin-top: 0.3rem;
        text-align: center;
        .tree {
          height: 2.133333rem;
        }
        .b-text {
          display: inline-block;
          font-size: 0.32rem;
          width: 3.333333rem;
          padding: 0 0.15rem;
          text-align: right;
          line-height: 0.666667rem;
          position: relative;
          top: -0.2rem;
          .span {
            font-size: 0.44rem;
            font-weight: bold;
            color: rgb(48, 191, 109);
          }
        }
        .code {
          width: 2rem;
          height: 2rem;
        }
      }
      .logo {
        width: 100%;
        text-align: center;
        img {
          height: 0.7rem;
          margin-bottom: 0.1rem;
          position: relative;
          top: 0.1rem;
        }
      }
    }
  }
  .bottom0 {
    position: absolute;
    bottom: 0;
    height: 0.853333rem;
    background: #fff;
    text-align: center;
    font-size: 0.293333rem;
    width: 100%;
    line-height: 0.853333rem;
    .img {
      background: url(../assets/prion.png);
      display: inline-block;
      width: 0.4rem;
      height: 0.5rem;
      background-size: 100% 100%;
      line-height: 0.853333rem;
      vertical-align: middle;
    }
  }
}
</style>

