'use strict';

var Dispatcher = require('flux').Dispatcher,
    AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action, callback) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });

  if (typeof callback === 'function') {
    return callback();
  }
};

module.exports = AppDispatcher;
