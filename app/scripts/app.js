'use strict';

angular.module('iosTools', [
  'ngResource',
  'ngRoute',
  'iosToolsController',
  'iosToolsModules',
  'mm.foundation',
  'angularSmoothscroll'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:modelId?', {
        controller: 'MainCtrl',
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
