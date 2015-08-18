'use strict';

var EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),

    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),

    ActionTypes = AppConstants.ActionTypes,
    CHANGE_EVENT = 'change';

var _devices = {};

var DeviceStore = _.extend({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getDeviceName: function(deviceId) {
    return _devices[deviceId];
  },

  getAllDevices: function() {
    return _devices;
  }

});

function loadDeviceData(data) {
  _devices = data;
}

// Register dispatcher callback
DeviceStore.dispatchToken = AppDispatcher.register(function(payload) {
  let action = payload.action;

  switch(action.actionType) {
    case ActionTypes.LOAD_ALL_DEVICES:
      loadDeviceData(action.data);
      DeviceStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = DeviceStore;