"use strict";

var _interopRequireWildcard = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _vuetify = _interopRequireDefault(require("./plugins/vuetify"));

require("roboto-fontface/css/roboto/roboto-fontface.css");

require("@mdi/font/css/materialdesignicons.css");

require("bootstrap/dist/css/bootstrap.css");

var _store = _interopRequireDefault(require("./store"));

var _date = _interopRequireDefault(require("./filters/date"));

var firebase = _interopRequireWildcard(require("firebase"));

var _Alert = _interopRequireDefault(require("../src/shared/Alert.vue"));

var _RegisterDialog = _interopRequireDefault(require("../src/components/registration/RegisterDialog.vue"));

var _EditMeetup = _interopRequireDefault(require("../src/components/edit/EditMeetup.vue"));

var _EditProfile = _interopRequireDefault(require("../src/components/edit/EditProfile.vue"));

_vue.default.config.productionTip = false;

_vue.default.filter('date', _date.default);

_vue.default.component('app-alert', _Alert.default);

_vue.default.component('app-register-dialog', _RegisterDialog.default);

_vue.default.component('app-edit-dialog', _EditMeetup.default);

_vue.default.component('app-edit-profile-dialog', _EditProfile.default);

new _vue.default({
  router: _router.default,
  vuetify: _vuetify.default,
  store: _store.default,
  render: function render(h) {
    return h(_App.default);
  },
  created: function created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD1yPyWylhKiWMS-dl9IOxJWrat3rhiW04',
      authDomain: 'meetup-app-98d64.firebaseapp.com',
      databaseURL: 'https://meetup-app-98d64.firebaseio.com',
      projectId: 'meetup-app-98d64',
      storageBucket: 'meetup-app-98d64.appspot.com',
      messagingSenderId: '578420368205',
      appId: '1:578420368205:web:012441449fc099822f0d04'
    });
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        _store.default.dispatch('autoSignIn', user);

        _store.default.dispatch('getDataUser');
      }
    });

    _store.default.dispatch('loadMeetups');
  }
}).$mount('#app');