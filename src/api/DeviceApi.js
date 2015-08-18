'use strict';

var axios = require('axios'),

    methods;

methods = {

  getAllDevices: function() {
    return axios.get('https://api.ipsw.me/v2.1/device');
  }

};

module.exports = methods;