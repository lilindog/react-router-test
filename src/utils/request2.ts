import axios from 'axios'
import store from "../store";

// 创建axios实例
const service = axios.create({
  baseURL: _ENV_.HOST, // api的base_url
  timeout: 15000// 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // 获取token， 没有绑定手机之前的就不要带了
  const token = store.getState().user && store.getState().user.member ? store.getState().user.token : "";
  if (token) {
    config.headers['Authorization'] = 'Bearer '+ token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    return res;
  },
  error => {
    return Promise.reject("网络错误");
  }
);

export default service;