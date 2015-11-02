'use strict';

var React = require('react');
var {render} = require('react-dom');
var {Router, Route} = require('react-router');

var FwToolApp = require('./FwToolApp');

// CSS
require('normalize.css');
require('bower_components/amazeui/less/amui.less');
require('styles/main.scss');

render((
  <Router>
    <Route path='/' component={ FwToolApp } />
  </Router>
), document.getElementById('content'));
