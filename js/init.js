head.load(
	'css/bootstrap.min.css',
	'css/style.css',
	'font-awesome-4.1.0/css/font-awesome.min.css',
	'//cdnjs.cloudflare.com/ajax/libs/mocha/1.21.4/mocha.css',
	'//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js',
	'//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js',
	'//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.13/backbone.localStorage-min.js',
	'//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min.js',
	'//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js',
	'js/backbone.marionette.min.js',
	'js/classie.js',
	'js/cbpAnimatedHeader.js',
	function() {
		head.load(
			'js/script.js'
		);
		head.ready(function () {
			$(function () {
				app.start();
			});
		});
	}
);