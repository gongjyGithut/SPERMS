import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //console.log(config.headers)
    //config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'  
    //config.headers['Content-Type'] = 'application/json;'
    config.headers['Access-Control-Allow-Origin'] = '*'

    // config.transformRequest = [function (data) { 
    //   // 在请求之前对data传参进行格式转换​
    //   data = qs.stringify(data)
    //   return data
    // }]

    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非100是抛错
     */
    const res = response.data
    //console.log(res)
    if (res.resultCode !== 100) {
      Message({
        message: res.resultMsg,
        type: 'error',
        duration: 5 * 1000
      })

      // 403:无权限访问;404:资源不存在;-1:未知异常;-100:异常;

      // if (res.code === 403 || res.code === 404 || res.code === -1) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
