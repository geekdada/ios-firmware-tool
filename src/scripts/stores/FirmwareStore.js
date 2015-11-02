'use strict';

var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var DeviceStore = require('./DeviceStore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _firmwares = {};
var _jailbreakFirmwares = {};

var FirmwareStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getFirmwares: () => _firmwares,

  getJailbreakFirmwares: () => _jailbreakFirmwares

});

function loadFirmwareData(data) {
  _firmwares = data;
}

function eraseFirmwareData() {
  _firmwares = {};
}

function loadJailbreakFirmwareData(data) {
  _jailbreakFirmwares = data;
}

FirmwareStore.dispatchToken = AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch (action.actionType) {
    case ActionTypes.FETCH_FIRMWARES:
      AppDispatcher.waitFor([DeviceStore.dispatchToken]);
      loadFirmwareData(action.data);
      FirmwareStore.emitChange();
      break;

    case ActionTypes.ERASE_FIRMWARES:
      eraseFirmwareData();
      FirmwareStore.emitChange();
      break;

    case ActionTypes.FETCH_JAILBREAK_FIRMWARES:
      loadJailbreakFirmwareData(action.data);
      break;

    default:
      return true;
  }

  return true;
});

module.exports = FirmwareStore;