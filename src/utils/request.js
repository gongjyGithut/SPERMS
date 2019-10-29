import axios from 'axios'
import { notifyError } from '@/utils/notify.js'
import JsEncrypt from 'jsencrypt'
import { parseTime } from './index'
import store from '../store'
// import { getToken } from '@/utils/auth'
// import qs from 'qs'
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        const PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----' +
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbC4yeaAR7VNJ6XxgtSlu/itr9PnEfziuP9858PYg4KdgnZ+G0yoTaasIncXR2boyyN7dJjwr2g0WIGRYwzcqob37Odw3R6uuIRCaPqg/AuWSDF/sdk7R5KVbBgZopYwH3P/7P0UL0dcXov1STFoVofKcpbqCZoneaAEgvcKtaSwIDAQAB' +
            '-----END PUBLIC KEY-----'
        const jse = new JsEncrypt()
        jse.setPublicKey(PUBLIC_KEY)
        const explain = 'sperms:' + parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
        const token = jse.encrypt(explain)
        config.headers['token'] = token
            // console.log(token)
            // if (store.getters.token) {
            //   config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行编辑
            // }
            // console.log(config.headers)
            // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
            // config.headers['Content-Type'] = 'application/json;'
        config.headers['Access-Control-Allow-Origin'] = '*'
        store.commit('showLoading')
            // console.log(config.headers)
            // config.transformRequest = [function (data) {
            //   // 在请求之前对data传参进行格式转换
            //   data = qs.stringify(data)
            //   return data
            // }]

        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
        store.commit('forceClose')
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        store.commit('hideLoading')
            /**
             * code为非100是抛错
             */
        const res = response.data
            // console.log(res)
        if (res.resultCode !== 100) {
            notifyError(res.resultMsg)
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        store.commit('hideLoading')
        notifyError(error.message)
        return Promise.reject(error)
    }
)

export default service