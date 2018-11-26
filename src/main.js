import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import napi from './api'
import flex from 'raziel-flex'
import VueCookie from 'vue-cookies'
import url from './url' //获取get值

Vue.use(VueCookie);//全局使用插件

flex(750); //传入值为页面变化最大宽
let api = new napi({ //实例化封装的ajax方法
  appid:"wx17745458a8a5358c",
  root:"http://grateful.xrspy.com/api",
  header:"application/x-www-form-urlencoded;charset=UTF-8",
  noauth(callback){
    callback(); 
  }
}) 
Vue.prototype.$api= api
Vue.config.productionTip = false;


  	(function() {
      var _mtac = {"performanceMonitor":1};
  		var mta = document.createElement("script");
  		mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
  		mta.setAttribute("name", "MTAH5");
  		mta.setAttribute("sid", "500657528");
  		mta.setAttribute("cid", "500657531");
  		var s = document.getElementsByTagName("script")[0];
  		s.parentNode.insertBefore(mta, s);
  	})();

Vue.prototype.$auth = (callback)=>{
  if(!store.state.token){   //验证token
    if(!VueCookie.get('token')){  //验证cookie
          if(url.code){
              //判断code是否存在
              let code = url.code;
              api.post("/auth/index", { code }, res => {
                //用code换取token
                if (res.code === 1) {
                  store.state.token = res.data.token;
                  store.state.data = res.data;
                  VueCookie.set("token", res.data.token, "12h");
                  VueCookie.set("data", res.data, "12h");
                  callback();
                } else {
                  // 无效code
                  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.APPID}&redirect_uri=${encodeURIComponent(
                    window.location.href
                  )}&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`;
                }
              });
            } else {
              //重定向获取code
              window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.APPID}&redirect_uri=${encodeURIComponent(
                window.location.href
              )}&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`;
            }
    }else{
      store.state.token = VueCookie.get('token');
      store.state.data = VueCookie.get('data');
      callback();
    }
  }else{
    callback();
  }
}
router.beforeEach((to, from, next) => {  //全局导航守卫
    if(!store.state.token){   //验证token
      if(!VueCookie.get('token')){  //验证cookie
            if(url.code){
                //判断code是否存在
                let code = url.code;
                api.post("/auth/index", { code }, res => {
                  //用code换取token
                  console.log(res);
                  if (res.code === 1) {
                    store.state.token = res.data.token;
                    store.state.data = res.data;
                    VueCookie.set("token", res.data.token, "12h");
                    VueCookie.set("data", res.data, "12h");
                    next();
                  } else {
                    //无效code
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.APPID}&redirect_uri=${encodeURIComponent(
                      window.location.href
                    )}&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`;
                  }
                });
              } else {
                // //重定向获取code
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${api.APPID}&redirect_uri=${encodeURIComponent(
                  window.location.href
                )}&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`;
              }
      }else{
        store.state.token = VueCookie.get('token');
        store.state.data = VueCookie.get('data');
        next();
      }
    }else{
      next();
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
