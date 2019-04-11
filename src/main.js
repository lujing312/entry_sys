import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ECharts from 'vue-echarts/components/ECharts'

// import Mock from './mock'
// Mock.init()

Vue.use(ElementUI)
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
