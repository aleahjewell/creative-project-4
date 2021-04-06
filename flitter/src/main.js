import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'
import VueMq from 'vue-mq'

let data = {
  allData: mock,
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    desktop: Infinity,
  }
})
