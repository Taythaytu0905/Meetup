"use strict";

var _interopRequireDefault = require("/home/nguyenthanhdo/meetup-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.splice");

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
}), (0, _defineProperty2.default)(_CREATE_MEETUP$SET_LO, _mutationTypes.EDIT_MEETUP, function (state, payload) {
  var meetup = state.loadedMeetups.find(function (meetup) {
    return meetup.id === payload.id;
  });

  if (payload.title) {
    meetup.title = payload.title;
  }

  if (payload.location) {
    meetup.location = payload.location;
  }

  if (payload.description) {
    meetup.description = payload.description;
  }

  if (payload.imageUrl) {
    meetup.imageUrl = payload.imageUrl;
  }

  if (payload.date) {
    meetup.date = payload.date;
  }
}), (0, _defineProperty2.default)(_CREATE_MEETUP$SET_LO, _mutationTypes.DELETE_MEETUP, function (state, payload) {
  var meetups = state.loadedMeetups;
  meetups.splice(meetups.findIndex(function (meetup) {
    return meetup === payload;
  }), 1);
}), _CREATE_MEETUP$SET_LO);

exports.default = _default;