'use strict';

var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),

    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),

    DeviceStore = require('./DeviceStore'),

    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _firmwares = {};

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

  getFirmwares: function() {
    return _firmwares;
  }

});

function loadFirmwareData(data) {
  _firmwares = data;
}

function eraseFirmwareData() {
  _firmwares = {};
}

FirmwareStore.dispatchToken = AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.actionType) {
    case ActionTypes.FETCH_FIRMWARES:
      AppDispatcher.waitFor([DeviceStore.dispatchToken]);
      loadFirmwareData(action.data);
      FirmwareStore.emitChange();
      break;

    case ActionTypes.ERASE_FIRMWARES:
      eraseFirmwareData();
      FirmwareStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = FirmwareStore;