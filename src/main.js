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
      apiKey: 'AIzaSyD1yPyWylhKiWMS-dl9IOxJWrat3rhiW04',
      authDomain: 'meetup-app-98d64.firebaseapp.com',
      databaseURL: 'https://meetup-app-98d64.firebaseio.com',
      projectId: 'meetup-app-98d64',
      storageBucket: 'meetup-app-98d64.appspot.com',
      messagingSenderId: '578420368205',
      appId: '1:578420368205:web:012441449fc099822f0d04'
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
