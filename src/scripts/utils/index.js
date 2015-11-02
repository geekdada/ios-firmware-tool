'use strict';

var _ = require('lodash');

module.exports = {

  pickFirmwareByBuildId: (firmwares, buildId) => _.filter(firmwares, function(firmware) {
    return firmware.buildid === buildId;
  }),

  findJailbreakInfo: function(jailbreakData) {}

};