// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

// 全局配置请求的基础路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 设置公共的请求头
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

axios.interceptors.request.use((config) => {
  // console.log('请求拦截器', config)
  // 这里可以设置请求头，每次发送请求都会携带
  if (config.url.indexOf('login') === -1) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config
})
// 给vue的原型添加方法，就可以全局用axios，不用每一个文件都引入
Vue.prototype.axios = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App></App>'
})
