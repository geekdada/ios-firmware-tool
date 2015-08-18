'use strict';

describe('FluxDemoApp', function () {
  var React = require('react/addons');
  var FluxDemoApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    FluxDemoApp = require('components/FluxDemoApp.js');
    component = React.createElement(FluxDemoApp);
  });

  it('should create a new instance of FluxDemoApp', function () {
    expect(component).toBeDefined();
  });
});
