import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式：
import './assets/style/base.scss'
import './assets/style/iconfont.css'
// 按需引入 Vant 中的组件：
import { Button, CellGroup, Form, Field } from 'vant'
import 'vant/lib/index.css'

// 引入自定义的方法并进行全局挂载：
import storage from './util/storage'
import request from './util/request'
import api from './api/api'

const app = createApp(App)

// 全局挂载：
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api

app
  .use(Button)
  .use(CellGroup)
  .use(Form)
  .use(Field)
  .use(store)
  .use(router)
  .mount('#app')
