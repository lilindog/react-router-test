/*
 * @Author: hua
 * @LastEditors  : hua
 * @Date: 2019-04-23 20:42:22
 * @LastEditTime : 2019-12-23 10:23:28
 */
import axios from 'axios'
import { Toast } from 'antd-mobile';
import store from "../store";

// 创建axios实例
const service = axios.create({
  baseURL: _ENV_.HOST, // api的base_url
  timeout: 15000// 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // 获取token， 没有绑定手机之前的就不要带了
  const token = store.getState().user && store.getState().user.member ? store.getState().user.token : "";
  // console.log(store.getters.is_auth)
  if (token) {
    config.headers['Authorization'] = 'Bearer '+ token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
   /**
    * error为true时 显示msg提示信息
    */
    const res = response.data
    // 请求成功
    if (res.code === 0) {
      return res
    }
    // Token鉴权失败
    if (res.code === 401) {
     
     /*  Toast({mes: res.message,
        icon: 'error'
      }) */

      // 这里需要删除token，不然携带错误token无法去登陆
      window.localStorage.removeItem('token')
      //router.push({name:'403'})
      return Promise.reject('error')
    }
    Toast.fail(res.message, 1);
    return Promise.reject('error')
  },
  error => {
    /* let loading =document.getElementsByClassName('yd-dialog-white-mask')[0]
    if(loading != null)  loading.parentNode.removeChild(loading) */

    /* 网络超时处理 */
    if (error == 'Error: timeout of 15000ms exceeded') {
      Toast.fail("网络超时", 1);
      return Promise.reject('error')
    }
    /* 网络无响应处理 */
    if(typeof(error.response) == 'undefined'){
      if(error == 'Error: Network Error'){
        Toast.fail("网络错误,请检查网络", 1);
        return Promise.reject('error')
      }
    }
    /* 权限错误 */
    /* if(error.response.status == 401){
        Toast({mes:error.response.data.msg, icon: 'error'})
        window.localStorage.removeItem('token')
        router.push({name:'403'})
        return Promise.reject('error')
    } */
    return Promise.reject(error)
  }
)

export default service
