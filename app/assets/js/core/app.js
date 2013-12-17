'use strict';
angular.module('fe0', [
	'ngRoute',
	'ngResource',
	'fe0.filters',
	'fe0.helper',
	'fe0.services',
	'fe0.directives',
	'fe0.controllers'
])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
	$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
	$routeProvider.otherwise({redirectTo: '/view1'});
}])
/**
 * Configuration
 *
 * @author Festum
 */
.factory('config', function($location) {
	var project = $location.absUrl().split('/')[3],
	project = project.search("#")>0?project:'';
	return JSON.parse(angular.toJson(
		{
			site:{
				protocal: $location.protocol(),
				server: $location.host(),
				project: project,
				port: $location.port(),
				endpoint: $location.protocol()+'://'+$location.host()+($location.port()=='80'||$location.port()=='443'?'':$location.port())+(project==''?'':'/'+project)+'/#',
				draggable: true,
				sort: 'nmst',
				orders: '1010',
			}
		}
	));
})
.factory('configFile', function($resource) {
	return $resource('config.json',{ }, {getData: {method:'GET', isArray: false}});
})
;
