<template lang="pug">
  .home
    .body 
      //- 云
      .yun
      .yun0.yun
      .yun1.yun
      .yun2.yun
      //- img(src="../assets/w.gif").img
      //-能量条
      .energy 
        .title 能量条
        .num {{data.gratefulTotal}}/
          span.text 18888
        .box
          .hover(:style="{'height':(data.gratefulTotal/18888*100)+'%'}")
      //- 排名
      .rank
        .box 
          img(:src="data.imgUrl" alt="头像")
          .ranknum {{data.devote}}
             span.text 能量
          .rankname 
            .num {{data.rank}}
              span.text 名
      //- 操作按钮
      .btn_box
        img(src="../assets/water.png" alt="浇水" v-if="!data.watering" @click="set('watering',0)").img
        img(src="../assets/muck.png" alt="施肥"  v-if="!data.fertilize"  @click="set('fertilize',1)").img.img0
        img(src="../assets/bug.png" alt="除虫"  v-if="!data.worm"  @click="set('worm',2)").img.img1
        img(:src="setbtn[setindex].url" 
        :class="{setactive:setactive,img0:setindex==1,img2:setindex==2,img1:setindex==0}" 
         alt="操作动画").setbtn
      //- 树a
      .tree(:class="{active:off}" :style="{'backgroundImage':'url(http://xueersiimg.xrspy.com/tree/tree/tree'+state+'.png)',width:width+'rem',height:width+'rem','margin-left':'-'+width/2+'rem'}" @click="active")
        transition(name="zoom")
          .dialog(v-if="dialog" :style="{left:left+'%'}" )
            .triangle
            .box
              .title {{messagedata.nickname}}
              .text {{messagedata.text}}
              img(:src="messagedata.header" alt="头像").header
    //- 底部菜单
    .tab
      .title
        .box_left
          img(src="../assets/new.png" alt="最新动态")
        .box_right
          img(src="../assets/strategy.png" alt="攻略" @click="openmodel").img0
          img(src="../assets/share.png" alt="分享" @click="share")
      .box
        .list(v-for="(v,index) in list" v-if="list.length>=15" @transitionend="transitionend" :style="{'transform':'translateX('+dx+'rem)',transition:listsion}")
          img( :src="v.img_url" alt="头像").header
          img( :src="v.status==1?require('../assets/water1.png'):v.status==2?require('../assets/muck1.png'):require('../assets/bug1.png')" alt="操作").set
    .modelbox(v-if="model!=''")
      .model
        img(:src="'http://xueersiimg.xrspy.com/tree/'+model+'.png?imageslim'"  alt="攻略")
        .close(@click="close" v-if="model!='diagle'")
        textarea.text(autofocus v-model='text' v-if="model=='diagle'") 
        .btn(v-if="model=='diagle'" @click="confirm") 提&nbsp;&nbsp;&nbsp;交
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      data: {},
      list: [],
      dx: 0,
      listsion: "all 1s linear",
      textarr: [
        "感谢帮助我的人，从中获得了宽容。",
        "感谢教导我的人，从中获得了知识。",
        "最真的祝福化作风，吹送到你的身边。",
        "把我的感谢化作万语千言，为你祈祷幸福永远。",
        "感谢强大的对手给予我们的竞争压力和挑战。",
        "感谢对手给予我们学习的鞭策和成长进步的动力。",
        "感谢你的关怀，感谢你的帮助，感谢你对我做的一切。",
        "感谢老师对我们心智的启迪和生命成长的关怀。",
        "感念老师对我们的辛勤付出和教诲。",
        "在感念师恩中崇德成才，奉献社会。"
      ],
      off: false,
      dialog: false,
      setbtn: [
        { top: "0", url: require("../assets/watera.gif"), off: true },
        { top: "1.653333rem", url: require("../assets/mucka.gif"), off: true },
        { top: "3.2rem", url: require("../assets/buga.gif"), off: true }
      ],
      setindex: 0,
      setactive: false,
      settimer: null,
      left: 3.8,
      model: "",
      text: "",
      messagedata: {
        header:
          "http://image.biaobaiju.com/uploads/20180918/15/1537256494-ZnSKMzEoBI.jpeg",
        text: "******************",
        nickname: "上海学而思"
      },
      state:0,
      width:0,
      height:0
    };
  },
  watch: {
    text() {
      if (this.text.length > 30) {
        this.text = this.text.substr(0, 30);
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.state.loading = false;
    }, 1000);
  },
  methods: {
    set(str, index) {
      let status = index + 1;
      this.$api.wxpost(
        "/index/action",
        { token: this.$store.state.token, status },
        res => {
          this.data.gratefulTotal++;
          this.data.devote++;
          clearTimeout(this.settimer);
          this.data[str] = true;
          this.setindex = index;
          this.setactive = true;
          this.settimer = setTimeout(() => {
            this.setactive = false;
          }, 3000);
        }
      );
    },
    active() {
      if (!this.off) {
        this.off = true;
        this.$api.wxpost(
          "/index/randomMessage",
          { token: this.$store.state.token },
          res => {
            if (res.code == 1) {
              this.messagedata.header = res.data.img_url;
              this.messagedata.text = res.data.message;
              this.messagedata.nickname = res.data.nick_name;

              if (!this.dialog) {
                this.open();
              }
              setTimeout(() => {
                this.off = false;
              }, 3000);
            }
          }
        );
      }
    },
    open() {
      this.left = Math.random() * 50;
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false;
      }, 3000);
    },
    share() {
      this.$store.state.loading=true;
      this.$router.push({
        path: "/share",
        name: "share"
      });
    },
    close() {
      this.model = "";
    },
    init(data) {
      let arr = [2888,7888,12888,18888];
      if(data.gratefulTotal>18888){
          this.state = 4;
          this.width = 7.333333;
      }else{
          for(let i=0;i<5;i++){
        if(data.gratefulTotal-arr[i]<0){
          this.state = i;
          this.width = 7.333333 * (5+i) /10 ;
          break;
        }
      }
      }
      if (data.actionList != []) {
        this.list = data.actionList;
        for (let i = 0; i < 5; i++) {
          this.list.push(this.list[i]);
        }
        setInterval(() => {
          //底部轮播图
          this.dx -= 1.88;
        }, 2000);
      }
    },
    confirm() {
      this.$api.wxpost(
        "/index/login",
        { token: this.$store.state.token, message: this.text },
        res => {
          if (res.code == 1) {
            this.$store.state.data.status = 1;
            this.$cookies.set("data", this.$store.state.data, "12h");
            this.$api.wxpost(
              "/index/index",
              { token: this.$store.state.token },
              res => {
                if (res.code == 1) {
                  this.data = res.data;
                  this.init(res.data);
                  this.model = "";
                }
              }
            );
          }
        }
      );
    },
    openmodel() {
      this.model = "gonglv";
    },
    transitionend() {
      if (this.dx <= -18) {
        this.listsion = "none";
        this.dx = 0;
        setTimeout(() => {
          this.listsion = "all 1s linear";
        }, 100);
      }
    }
  },
  created() {
    this.$auth(() => {
      console.log(this.$store.state.data);
      this.data.imgUrl = this.$store.state.data.img_url
      this.data.devote = 0
      this.data.rank = 0
      if (this.$store.state.data.status == 0) {
        this.model = "diagle"; //显示留言框
        this.text = this.textarr[Math.floor(Math.random() * 10)];
      } else {
        this.$api.wxpost(
          "/index/index",
          { token: this.$store.state.token },
          res => {
            if (res.code == 1) {
              this.data = res.data;
              this.init(res.data);
            }
          }
        );
      }
    });
  }
};
</script>

<style lang="less" scoped>
@main : rgb(29, 159, 78);
.home {
  width: 100%;
  user-select: none;
  .modelbox {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 9999;
  }
  .model {
    position: absolute;
    width: 90%;
    left: 5%;
    top: 2rem;
    z-index: 9999;
    img {
      width: 100%;
    }
    .close {
      position: absolute;
      right: 0.4rem;
      top: 0.4rem;
      width: 0.8rem;
      height: 0.8rem;
      background: url(../assets/close.png);
      background-size: 100% 100%;
    }
    .text {
      display: block;
      position: absolute;
      left: 10%;
      top: 1.5rem;
      width: 80%;
      height: 4rem;
      border: none;
      outline: none;
      resize: none;
      font-size: 0.45rem;
      color: #999;
    }
    .btn {
      position: absolute;
      bottom: 1.1rem;
      left: 50%;
      margin-left: -1.2rem;
      line-height: 0.7rem;
      width: 2.41rem;
      height: 0.7rem;
      font-size: 0.41rem;
      color: rgb(69, 34, 24);
      border-radius: 3px;
      text-align: center;
      background: -webkit-linear-gradient(
        rgb(255, 201, 0),
        rgb(223, 133, 0)
      ); /* Safari 5.1 - 6.0 */
      background: linear-gradient(
        rgb(255, 201, 0),
        rgb(223, 133, 0)
      ); /* 标准的语法 */
    }
  }
  .tab {
    .title {
      height: 1.373333rem;
      line-height: 1.373333rem;
      .box_left {
        float: left;
        margin-left: 0.6rem;
        width: 1.733333rem;
        height: 100%;
        img {
          width: 100%;
        }
        .img0 {
          margin-right: 0.266667rem;
        }
      }
      .box_right {
        float: right;
        width: 2.666667rem;
        height: 100%;
        margin-right: 0.493333rem;
        img {
          width: 1.2rem;
        }
      }
    }
    .box {
      height: 1.4rem;
      text-align: center;
      margin: 0 0.32rem 0 0.25rem;
      white-space: nowrap;
      overflow: hidden;
      .list {
        width: 1.75rem;
        height: 100%;
        margin-left: 0.13rem;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        transition: all 1s linear;
        .header {
          width: 1.173333rem;
          height: 1.173333rem;
          border-radius: 0.066667rem;
        }
        .set {
          width: 0.6rem;
          height: 0.6rem;
          // margin-bottom: -.1rem;
          // margin-left: -.1rem;
        }
      }
    }
  }
  .body {
    width: 100%;
    height: 14.573333rem;
    background: url(http://xueersiimg.xrspy.com/tree/bg.png?imageslim);
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    .tree {
      width: 7.333333rem;
      height: 6.586667rem;
      position: absolute;
      left: 50%;
      margin-left: -3.66666666rem;
      bottom: 2rem;
      background-size: 100% 100%;
      transition: all 0.2s ease-in-out;
      transform: scale(1, 1);
      transform-origin: 0 100%;
      -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
      cursor: pointer;
      .dialog {
        width: 3.35rem;
        position: absolute;
        top: 50%;
        left: 50%;
        .triangle {
          width: 0;
          height: 0;
          position: absolute;
          top: -0.38rem;
          left: 0.6rem;
          border: 0.2rem solid transparent;
          border-bottom-color: #fff;
        }
        .box {
          width: 100%;
          max-height: 3.8rem;
          background: #fff;
          border-radius: 0.333333rem;
          box-sizing: border-box;
          padding: 0.2rem 0.333333rem 0.4rem;
          .title {
            font-size: 0.293333rem;
            color: rgb(82, 82, 82);
            margin-bottom: 0.106667rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .text {
            font-size: 0.293333rem;
            line-height: 0.4rem;
          }
          .header {
            position: absolute;
            width: 0.826667rem;
            height: 0.826667rem;
            border: 3px solid rgb(232, 132, 49);
            border-radius: 50%;
            right: -0.4rem;
            bottom: -0.4rem;
          }
        }
      }
    }
    .btn_box {
      position: absolute;
      top: 4.066667rem;
      right: 0.466667rem;
      height: 4.32rem;
      width: 1.066667rem;
      z-index: 999;
      .img {
        width: 1.066667rem;
        position: absolute;
        left: 0;
        top: 0;
        transform: scale(1, 1);
        transition: all 1.5s linear;
        animation: img 3s infinite;
        z-index: 999;
      }
      .img2 {
        top: 0;
      }
      .img0 {
        top: 1.653333rem;
      }
      .img1 {
        top: 3.2rem;
      }
      .setbtn {
        width: 3rem;
        left: -1.2rem;
        top: 0rem;
        position: absolute;
        transition: all 0.8s linear;
        opacity: 0;
      }
      .setactive {
        top: 2rem;
        left: -4.5rem;
        opacity: 1;
      }
    }
    .rank {
      position: absolute;
      top: 2.6rem;
      height: 0.973333rem;
      background: #fff;
      display: inline-block;
      right: 0;
      border-top-left-radius: 1.3rem;
      border-bottom-left-radius: 1.3rem;
      box-sizing: border-box;
      padding: 0 0.106667rem;
      .box {
        display: inline-block;
        white-space: nowrap;
        position: relative;
        top: 0.082rem;
        box-sizing: border-box;
        height: 0.8rem;
        vertical-align: top;
        font-size: 0.24rem;
        line-height: 0.8rem;
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          vertical-align: top;
        }
        .ranknum {
          color: @main;
          line-height: 0.8rem;
          text-align: center;
          display: inline-block;
          font-size: 0.373333rem;
          vertical-align: top;
          padding: 0 0.106667rem;
          font-weight: bold;
           .text {
            font-size: 0.226667rem;
            font-weight: normal;
            margin-left: 0.08rem;
          }
        }
        .rankname {
          vertical-align: top;
          height: 0.8rem;
          border-radius: 0.4rem;
          background: @main;
          font-size: 0.386667rem;
          color: #fff;
          text-align: center;
          display: inline-block;
          font-weight: bold;
          line-height: 0.8rem;
          padding: 0 0.186667rem;
          box-sizing: border-box;
          margin-right: 0.25rem;
          .text {
            font-size: 0.226667rem;
            font-weight: normal;
            margin-left: 0.08rem;
          }
        }
      }
    }
    .energy {
      width: 2.4rem;
      height: 5.866667rem;
      position: absolute;
      top: 2.506667rem;
      left: 0;
      font-size: 0.4rem;
      font-weight: bold;
      text-align: center;
      color: rgb(149, 218, 69);
      text-shadow: 0px 0px 3px rgb(68, 30, 25);
      .num {
        line-height: 0.72rem;
        text-align: center;
        width: 100%;
        .text {
          color: #fff;
        }
      }
      .box {
        width: 0.44rem;
        height: 4.44rem;
        border: 0.04rem solid rgb(52, 16, 0);
        border-radius: 0.25rem;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        .hover {
          position: absolute;
          box-sizing: border-box;
          left: 0%;
          bottom: 0;
          width: 110%;
          height: 50%;
          background: -webkit-linear-gradient(
            rgb(4, 157, 68),
            rgb(173, 209, 108)
          ); /* Safari 5.1 - 6.0 */
          background: linear-gradient(
            rgb(4, 157, 68),
            rgb(173, 209, 108)
          ); /* 标准的语法 */
        }
      }
    }
    .img {
      position: absolute;
      top: 4rem;
      left: 2.55rem;
      width: 2.333333rem;
    }
    .yun {
      width: 2.533333rem;
      height: 1.333333rem;
      background: url(../assets/yun0.png);
      position: absolute;
      background-size: 100% 100%;
      top: 1.04rem;
      left: -2.533333rem;
      animation: myfirst 11s infinite;
      transition: left 11s linear;
      z-index: 0;
    }
    .yun0 {
      width: 2rem;
      height: 1.2rem;
      background: url(../assets/yun1.png);
      top: 3rem;
      background-size: 100% 100%;
      animation: two 9s infinite linear;
      transition: left 9s linear;
      animation-delay: 5s;
    }
    .yun1 {
      background: url(../assets/yun2.png);
      background-size: 100% 100%;
      animation-delay: 3s;
      animation: two 13s infinite linear;
      transition: left 13s linear;
    }
    .yun2 {
      width: 2rem;
      height: 1.2rem;
      background: url(../assets/yun3.png);
      top: 3rem;
      background-size: 100% 100%;
      animation: two 15s infinite linear;
      transition: left 15s linear;
      animation-delay: 7s;
    }
  }
}
.zoom-enter-active {
  animation: bounce-in 0.5s;
}
.zoom-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform-origin: 0% 0%;
    transform: scale(1, 0);
  }
  100% {
    transform-origin: 0% 0%;
    transform: scale(1, 1);
  }
}
@keyframes myfirst {
  from {
    left: -2.533333rem;
  }
  to {
    left: 10rem;
  }
}
@-webkit-keyframes myfirst /* Safari 和 Chrome */ {
  from {
    left: -2.533333rem;
  }
  to {
    left: 10rem;
  }
}
@keyframes two {
  from {
    left: -2rem;
  }
  to {
    left: 10rem;
  }
}
@-webkit-keyframes two /* Safari 和 Chrome */ {
  from {
    left: -2rem;
  }
  to {
    left: 10rem;
  }
}
@keyframes img {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@-webkit-keyframes img /* Safari 和 Chrome */ {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.3, 1.3);
  }
  100% {
    transform: scale(1, 1);
  }
}
.active {
  animation: ani 1s;
}
@keyframes ani {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.08);
  }
  50% {
    transform: scale(1, 1);
  }
  75% {
    transform: scale(1, 1.04);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>

