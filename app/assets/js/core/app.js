'use strict';

var app, deps;

deps = [
	'ngRoute',
	'ngResource',
	'fe0.filters',
	'fe0.helper',
	'fe0.services',
	'fe0.directives',
	'fe0.controllers'
];
if (angular.version.full.indexOf("1.2") >= 0) {
	deps.push('ngAnimate');
}
app = angular.module('fe0', deps);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/main', {templateUrl: 'partials/main.html', controller: 'main'});
	$routeProvider.when('/conf', {templateUrl: 'partials/conf.html', controller: 'conf'});
	$routeProvider.otherwise({redirectTo: '/main'});
}]);

/**
 * Configuration
 *
 * @author Festum
 */
app.factory('config', function($location) {
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
});
app.factory('configFile', function($resource) {
	return $resource('config.json',{ }, {getData: {method:'GET', isArray: false}});
});
