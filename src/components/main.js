'use strict';

var React = require('react');
var Router = require('react-router');
var {Route} = Router;

var FwToolApp = require('./FwToolApp');

// CSS
require('normalize.css');
require('../../bower_components/amazeui/less/amui.less');
require('../styles/main.scss');

var Routes = (
  <Route path='/' handler={ FwToolApp } />
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('content'));
});
