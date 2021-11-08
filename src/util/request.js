/**
 * @description axios二次封装
 * @author 凉风有信、
 */
import axios from 'axios'
import config from './../config/config'
import { Toast } from 'vant'
import router from './../router'
import storage from './storage'
import store from '../store'
import { TOKEN_INVALID, NETWORK_ERROR } from '../config/constants'

// 创建axios实例对象，添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
  // 发送请求时将加载动画展示：
  store.commit('changeLoading', true)

  const headers = req.headers
  const { tokenValue = '11', tokenName = 'Maoyan' } = storage.getItem('userInfo') || {}
  // 携带token！！！还有一点bug
  if (!headers.Authorization) headers.Authorization = `${tokenName}:${tokenValue}`
  if (!headers[tokenName]) headers[tokenName] = tokenValue
  return req
})

// 响应拦截
service.interceptors.response.use((res) => {
  // 请求完毕后将动画进行隐藏：
  store.commit('changeLoading', false)

  const { code, data, msg } = res.data
  // 根据 code 码进行拦截操作：
  if (code === 200) {
    return { code, data, msg }
  } else if (code === 500001) {
    // token 过期，需要重新登录
    Toast.fail(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else if (code === 500) {
    Toast('用户名或密码错误！')
    return { code, data, msg }
  } else if (code === 404) {
    console.log(msg)
    return { code, data, msg }
  } else {
    Toast.fail(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})
/**
   * 请求核心函数
   * @param {*} options 请求配置
   */
function request (options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockAPi : config.baseApi
  }

  return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request
