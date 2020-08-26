"use strict";

var _interopRequireWildcard = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _mutationTypes = require("../mutation-types");

var firebase = _interopRequireWildcard(require("firebase"));

var _default = {
  loadMeetups: function loadMeetups(_ref) {
    var commit = _ref.commit;
    commit(_mutationTypes.SET_LOADING, true);
    commit(_mutationTypes.CLEAR_ERROR);
    firebase.database().ref('meetups').once('value').then(function (data) {
      var meetups = [];
      var obj = data.val();

      for (var key in obj) {
        meetups.push({
          id: key,
          title: obj[key].title,
          description: obj[key].description,
          location: obj[key].location,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date,
          creatorId: obj[key].creatorId
        });
      }

      commit(_mutationTypes.SET_LOADED_MEETUPS, meetups);
      commit(_mutationTypes.SET_LOADING, false);
    }).catch(function (error) {
      commit(_mutationTypes.SET_ERROR, error);
      commit(_mutationTypes.SET_LOADING, true);
    });
  },
  createMeetup: function createMeetup(_ref2, payload) {
    var commit = _ref2.commit,
        getters = _ref2.getters;
    var meetup = {
      title: payload.title,
      location: payload.location,
      imageUrl: payload.imageUrl,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: getters.user.id
    };
    console.log(meetup);
    firebase.database().ref('meetups').push(meetup).then(function (data) {
      var key = data.key;
      commit(_mutationTypes.CREATE_MEETUP, (0, _objectSpread2.default)({}, meetup, {
        id: key
      }));
    }).catch(function (error) {
      return commit(_mutationTypes.SET_ERROR, error);
    });
  }
};
exports.default = _default;