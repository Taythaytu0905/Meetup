"use strict";

var _interopRequireWildcard = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

require("core-js/modules/es.function.name");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var firebase = _interopRequireWildcard(require("firebase"));

var _mutationTypes = require("../mutation-types");

var _default = {
  signUserUp: function signUserUp(_ref, payload) {
    var commit = _ref.commit;
    commit(_mutationTypes.SET_LOADING, true);
    commit(_mutationTypes.CLEAR_ERROR);
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(function (user) {
      commit(_mutationTypes.SET_LOADING, false);
      var newUser = {
        id: user.uid,
        registeredMeetups: [],
        fbKeys: {},
        name: '',
        phone: '',
        idProfile: '',
        location: ''
      };
      commit(_mutationTypes.SET_USER, newUser);
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  },
  signUserIn: function signUserIn(_ref2, payload) {
    var commit = _ref2.commit;
    commit(_mutationTypes.SET_LOADING, true);
    commit(_mutationTypes.CLEAR_ERROR);
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(function (user) {
      commit(_mutationTypes.SET_LOADING, false);
      var newUser = {
        idProfile: '',
        id: user.uid,
        registeredMeetups: [],
        fbKeys: {},
        name: '',
        phone: '',
        location: ''
      };
      commit(_mutationTypes.SET_USER, newUser);
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  },
  autoSignIn: function autoSignIn(_ref3, payload) {
    var commit = _ref3.commit;
    commit(_mutationTypes.SET_USER, {
      idProfile: '',
      id: payload.uid,
      registeredMeetups: [],
      fbKeys: {},
      name: '',
      phone: '',
      location: ''
    });
  },
  logout: function logout(_ref4) {
    var commit = _ref4.commit;
    firebase.auth().signOut();
    commit(_mutationTypes.SET_USER, null);
  },
  registerUserForMeetup: function registerUserForMeetup(_ref5, payload) {
    var commit = _ref5.commit,
        getters = _ref5.getters;
    commit(_mutationTypes.SET_LOADING, true);
    var user = getters.user;
    firebase.database().ref('/user/' + user.id).child('/registration/').push(payload).then(function (data) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.REGISTER_MEETUP, {
        id: payload,
        fbKey: data.key
      });
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  },
  unregisterUserFromMeetup: function unregisterUserFromMeetup(_ref6, payload) {
    var commit = _ref6.commit,
        getters = _ref6.getters;
    commit(_mutationTypes.SET_LOADING, true);
    var user = getters.user;

    if (!user.fbKeys) {
      return;
    }

    var fbKey = user.fbKeys[payload];
    firebase.database().ref('/user/' + user.id + '/registration/').child(fbKey).remove().then(function () {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.UNREGISTER_MEETUP, payload);
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  },
  getDataUser: function getDataUser(_ref7) {
    var commit = _ref7.commit,
        getters = _ref7.getters;
    commit(_mutationTypes.SET_LOADING, true);
    firebase.database().ref('/user/' + getters.user.id + '/registration/').once('value').then(function (data) {
      var dataRegister = data.val();
      var registeredMeetups = [];
      var fbKeys = {};

      for (var key in dataRegister) {
        registeredMeetups.push(dataRegister[key]);
        fbKeys[dataRegister[key]] = key;
      }

      firebase.database().ref('/user/' + getters.user.id + '/profile/').once('value').then(function (data) {
        var profile = data.val();
        var name = '';
        var phone = '';
        var idProfile = '';
        var location = '';

        for (var _key in profile) {
          name = profile[_key].name;
          phone = profile[_key].phone;
          idProfile = _key;
          location = profile[_key].location;
        }

        var updateData = {
          idProfile: idProfile,
          name: name,
          phone: phone,
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: fbKeys,
          location: location
        };
        commit(_mutationTypes.SET_LOADING, false);
        commit(_mutationTypes.SET_USER, updateData);
      });
    }).catch(function (error) {
      commit(_mutationTypes.SET_ERROR, error);
      commit(_mutationTypes.SET_LOADING, true);
    });
  },
  addProfileUser: function addProfileUser(_ref8, payload) {
    var commit = _ref8.commit,
        getters = _ref8.getters;
    commit(_mutationTypes.SET_LOADING, true);
    var user = getters.user;
    firebase.database().ref('/user/' + user.id).child('/profile/').push(payload).then(function (data) {
      var newDataUser = {
        id: user.id,
        registeredMeetups: user.registeredMeetups,
        fbKeys: user.fbKeys,
        name: payload.name,
        phone: payload.phone,
        location: payload.location,
        idProfile: data.key
      };
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_USER, newDataUser);
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  },
  updateProfileUser: function updateProfileUser(_ref9, payload) {
    var commit = _ref9.commit,
        getters = _ref9.getters;
    commit(_mutationTypes.SET_LOADING, true);
    var user = getters.user;
    var updateObj = {};

    if (payload.name) {
      updateObj.name = payload.name;
    }

    if (payload.phone) {
      updateObj.phone = payload.phone;
    }

    if (payload.location) {
      updateObj.location = payload.location;
    }

    firebase.database().ref('/user/' + user.id + '/profile/').child(user.idProfile).update(updateObj).then(function (data) {
      commit(_mutationTypes.SET_LOADING, false);
      var newDataUser = {
        id: user.id,
        registeredMeetups: user.registeredMeetups,
        fbKeys: user.fbKeys,
        name: payload.name,
        phone: payload.phone,
        location: payload.location,
        idProfile: data.key
      };
      commit(_mutationTypes.SET_USER, newDataUser);
    }).catch(function (error) {
      commit(_mutationTypes.SET_LOADING, false);
      commit(_mutationTypes.SET_ERROR, error);
    });
  }
};
exports.default = _default;