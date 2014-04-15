head.load(
	'//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css',
	'assets/css/app.css',
	'assets/css/demo.css',
	'../bower_components/angular/angular.min.js',
	'../bower_components/angular-route/angular-route.min.js',
	'../bower_components/angular-resource/angular-resource.min.js',
	'../bower_components/angular-translate/angular-translate.min.js',
	'../bower_components/angular-animate/angular-animate.min.js',
	'../bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'../bower_components/angular-ui-utils/ui-utils.min.js',
	'../bower_components/angular-ui-router/release/angular-ui-router.min.js',
	'assets/js/core/struct.js',
	'assets/js/i18n/en_US.js',
	'assets/js/i18n/zh_TW.js',
	'assets/js/services/helper.js',
	'assets/js/filters/interpolate.js',
	'assets/js/directives/ver.js',
	'assets/js/controllers/main.js',
	'assets/js/controllers/conf.js',
	function() {
		head.load(
			'assets/js/core/app.js'
		);
		head.ready(function () {
			angular.bootstrap(document, ['fe0']);
		});
	}
);


