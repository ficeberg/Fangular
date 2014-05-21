head.load(
	'lib/bootstrap/dist/css/bootstrap.min.css',
	'lib/bootstrap/dist/css/bootstrap-theme.min.css',
	'assets/css/app.css',
	'assets/css/demo.css',
	'lib/angular/angular.min.js',
	'lib/angular-loader/angular-loader.min.js',
	'lib/angular-route/angular-route.min.js',
	'lib/angular-resource/angular-resource.min.js',
	'lib/angular-translate/angular-translate.min.js',
	'lib/angular-animate/angular-animate.min.js',
	'lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'lib/angular-ui-utils/ui-utils.min.js',
	'lib/angular-ui-router/release/angular-ui-router.min.js',
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


