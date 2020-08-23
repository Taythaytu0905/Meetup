"use strict";

var _interopRequireDefault = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.reflect.delete-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _mutationTypes = require("../mutation-types");

var _SET_USER$REGISTER_ME;

var _default = (_SET_USER$REGISTER_ME = {}, (0, _defineProperty2.default)(_SET_USER$REGISTER_ME, _mutationTypes.SET_USER, function (state, payload) {
  state.user = payload;
}), (0, _defineProperty2.default)(_SET_USER$REGISTER_ME, _mutationTypes.REGISTER_MEETUP, function (state, payload) {
  var id = payload.id;

  if (state.user.registeredMeetups.findIndex(function (meetupId) {
    return meetupId === id;
  }) >= 0) {
    return;
  }

  state.user.registeredMeetups.push(id);
  state.user.fbKeys[id] = payload.fbKey;
}), (0, _defineProperty2.default)(_SET_USER$REGISTER_ME, _mutationTypes.UNREGISTER_MEETUP, function (state, payload) {
  var registeredMeetups = state.user.registeredMeetups;
  registeredMeetups.splice(registeredMeetups.findIndex(function (meetup) {
    return meetup === payload;
  }), 1);
  Reflect.deleteProperty(state.user.fbKeys, payload);
}), _SET_USER$REGISTER_ME);

exports.default = _default;