/**
 * 环境配置封装
 */
// const env = import.meta.env.MODE || 'prod';
const env = 'dev'
const EnvConfig = {
  // 开发环境 --- 对应的实际接口和mock接口
  dev: {
    baseApi: 'http://159.75.112.81:8080/',
    mockAPi: '/forumApi'
  },
  // 测试环境 --- 对应的实际接口和mock接口
  test: {
    baseApi: 'api',
    mockAPi: 'api/'
  },
  // 生产环境 --- 对应的实际接口和mock接口
  prod: {
    baseApi: 'api/',
    mockAPi: 'api/'
  }
}
export default {
  env: 'dev',
  mock: false,
  namespace: 'quickdeveloptwo',
  ...EnvConfig[env]
}
