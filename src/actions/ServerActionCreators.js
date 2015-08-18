'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants'),
    DeviceApi = require('../api/DeviceApi'),
    FirmwareApi = require('../api/FirmwareApi'),

    ActionTypes = AppConstants.ActionTypes;

var ServerActions = {

  loadAllDevices: function() {
    DeviceApi.getAllDevices().then(function(response) {
      let data = response.data;

      AppDispatcher.handleAction({
        actionType: ActionTypes.LOAD_ALL_DEVICES,
        data: data
      });
    }).catch(function(err) {
      console.error(err);
    });
  },

  loadDeviceFirmwares: function(deviceId) {
    AppDispatcher.handleAction({
      actionType: ActionTypes.ERASE_FIRMWARES
    }, function() {
      FirmwareApi.getFirmwares(deviceId).then(function(response) {
        let data = response.data;

        AppDispatcher.handleAction({
          actionType: ActionTypes.FETCH_FIRMWARES,
          data: data
        });
      }).catch(function(err) {
        console.error(err);
      });
    });
  }

};

module.exports = ServerActions;