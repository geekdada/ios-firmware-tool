var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    LOAD_ALL_DEVICES: null,
    FETCH_FIRMWARES: null,
    FETCH_JAILBREAK_FIRMWARES: null,
    ERASE_FIRMWARES: null
  })

};