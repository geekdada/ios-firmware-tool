'use strict';

var axios = require('axios'),

    methods;

methods = {

  getFirmwares: function(deviceId) {
    if (typeof deviceId === 'string') {
      return axios.get('https://api.ipsw.me/v2.1/device/' + deviceId);
    } else {
      throw new Error('no_deviceId_given');
    }
  },

  getJailbreakFirmwares: function() {
    return axios.get('https://canijailbreak.com/jailbreaks.json');
  }

};

module.exports = methods;