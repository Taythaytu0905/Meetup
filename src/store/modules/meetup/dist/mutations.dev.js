"use strict";

var _interopRequireDefault = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/esm/defineProperty"));

var _mutationTypes = require("../mutation-types");

var _CREATE_MEETUP$SET_LO;

var _default = (_CREATE_MEETUP$SET_LO = {}, (0, _defineProperty2.default)(_CREATE_MEETUP$SET_LO, _mutationTypes.CREATE_MEETUP, function (state, payload) {
  state.loadedMeetups.push(payload);
}), (0, _defineProperty2.default)(_CREATE_MEETUP$SET_LO, _mutationTypes.SET_LOADED_MEETUPS, function (state, payload) {
  state.loadedMeetups = payload;
}), _CREATE_MEETUP$SET_LO);

exports.default = _default;