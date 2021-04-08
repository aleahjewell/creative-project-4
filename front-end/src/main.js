import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMq from 'vue-mq'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    desktop: Infinity,
  }
})
