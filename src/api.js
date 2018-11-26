import axios from 'axios';
import qs from 'qs';
const getdata = Symbol('getdata'); //设置唯一值，封装class私有方法。禁止外部访问
export default class wxajax {
    constructor(data) {
        this.APPID = data.appid;
        this.ROOT = data.root;
        this.request_header = data.header;
        this.NoAuth = data.noauth; //登录状态失效提示
        axios.defaults.headers.post['Content-Type'] = this.request_header; // 配置请求头
        axios.interceptors.request.use(
            config => {
                config.headers = {
                    'Content-Type': data.header
                };
                if (config.method === 'post') {
                    config.data = qs.stringify(config.data);
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            });
        axios.interceptors.response.use(  //错误拦截
            response => {
                return response;
            },
            error => {
                if (error.response) {
                    console.log("请求错误", error.response.status);
                }
                return Promise.reject(error);
            });
    }
    [getdata](method, url, params, success, failure) {
        let root = this.ROOT;
        axios({
            method: method,
            url: url,
            data: method === 'POST' || method === 'PUT' ? params : null,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            baseURL: root,
            withCredentials: true,
            timeout: 30000,
        })
            .then(function (res) {
                success(res.data);
            })
            .catch(function (err) {
                let res = err.response
                if (err) {
                    console.log('api error, HTTP CODE: ' + err)
                    failure(err.response.statusText)
                    return
                }
            })
    }
    get(url, params, success, failure) {
        this[getdata]('GET', url, params, success, failure)
    }
    post(url, params, success, failure) {
        this[getdata]('POST', url, params, success, failure)
    }
    put(url, params, success, failure) {
        this[getdata]('PUT', url, params, success, failure)
    }
    delete(url, params, success, failure) {
        this[getdata]('DELETE', url, params, success, failure)
    }
    wxpost(url, params, success, failure) { //微信post请求，附带权限验证
        this.post(url, params, (res) => {
            if (res.code === 2 || res.code === 3) {
                this.NoAuth(() => {
                    window.$cookies.remove('token')
                    window.$cookies.remove('data')
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.APPID}&redirect_uri=${encodeURIComponent(
                        window.location.href
                    )}&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`;
                })
            } else {
                success(res);
            }
        }, failure)
    }

}