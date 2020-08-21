import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from '../src/shared/Alert.vue'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DB_ULR,
      projectId: process.env.PR_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.M_SENDERID,
      appId: process.env.APP_ID
    })
  }
}).$mount('#app')
