/**
 * @author 凉风有信、
 * @description API的统一管理
 */

import request from '../util/request'

export default {
  // 登录：
  login (params) {
    return request({
      url: '/login',
      method: 'post',
      data: params
      // mock: true
    })
  },
  register (params) {
    return request({
      url: '/register',
      method: 'post',
      data: params
      // mock: true
    })
  }
}
