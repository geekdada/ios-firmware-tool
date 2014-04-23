'use strict';

var iosTools = angular.module('iosToolsController', []);

iosTools.controller('MainCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location) {
	if ( $routeParams.modelId ) {
		$scope.deviceModel = $routeParams.modelId;
	};
	$scope.setModel = function( model ) {
		$scope.deviceModel = model;
	};
	$http.get('views/firmware.json')
		.success(function( data ) {
			$scope.iphones = data.data.iphone;
			$scope.ipads = data.data.ipad;
			$scope.ipods = data.data.ipod;
			$scope.ipadminis = data.data.ipad_mini;
			$scope.atvs = data.data.atv;			
		})
}]);
