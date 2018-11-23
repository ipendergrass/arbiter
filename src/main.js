// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'babel-polyfill'
import store from './store'

import Jira from './services/Jira'

import moment from 'moment'
import VueMomentJS from 'vue-momentjs'

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

let isIE11 = !!window.MSInputMethodContext && !!document.documentMode
if (!isIE11) {
  Vue.use(Vuetify)
}
Vue.use(VueMomentJS, moment)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.issueTracker = Vue.prototype.$issueTracker = Jira
Vue.isIE11 = Vue.prototype.$isIE11 = isIE11

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
