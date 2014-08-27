'use strict';

window.app = new Backbone.Marionette.Application();

app.addRegions({
	header: '#header',
	main: '#main',
	footer: '#footer'
});

var sidebar = {
	exec: function(e){
		e.preventDefault();
		localStorage.setItem('menu',localStorage.getItem('menu')==='close'?'open':'close');
	},
	toggle: function(e){
		this.exec(e);
		$("#sidebar-wrapper").toggleClass("active");
	},
	close: function(e){
		this.exec(e);
		$("#sidebar-wrapper").removeClass("active");
	}
};

var view = {
	template: {
		p: Backbone.Marionette.ItemView.extend({
			template : '#ptemplate'
		}),
		r: Backbone.Marionette.ItemView.extend({
			template : '#rtemplate'
		})
	},
	req: [
		'https://graph.facebook.com/festum/?access_token=CAACvfGAqPZAABAP4tBWa81EhBiZA26OFAYhzXY5ZCsNur519YjgQ1JradjuSkGe1JW33zQl6FjOPfkjdUPZCUZARfivb10tthGehubYDGNI8nBJxR3dr3DovoU4L8K5cMxCV41aTEGERU2h9q9CyWwZCXY2aa00YrEC6nBsDaNtZBZBBZAaOpT5ZCaJ5fqfV8uBWZBhKWusHmanZCIPE9xsXHxBZB',
		'//festum.github.io/Fangular/js/README.js',
		'https://graph.facebook.com/festum/interests?access_token=CAACvfGAqPZAABAP4tBWa81EhBiZA26OFAYhzXY5ZCsNur519YjgQ1JradjuSkGe1JW33zQl6FjOPfkjdUPZCUZARfivb10tthGehubYDGNI8nBJxR3dr3DovoU4L8K5cMxCV41aTEGERU2h9q9CyWwZCXY2aa00YrEC6nBsDaNtZBZBBZAaOpT5ZCaJ5fqfV8uBWZBhKWusHmanZCIPE9xsXHxBZB',
		'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xfa1/v/t1.0-9/p417x417/1898024_10203157135199030_1274236353_n.jpg?oh=de96432430bf0cc1e09ba32d0b8ecb05&oe=547A3B58&__gda__=1417036243_01ede14b68207c548771a8c0e3664067'
	],
	run: function(){
		//get fb profile using perm token
		var req = this.req;
		var template = this.template;

		$.when($.ajax(req[0]),$.get(req[1]),$.ajax(req[2])).done(function(a1, a3){
			a1[0]['interests'] = a3[0]['data'];
			a1[0]['picture'] = req[3];

			alert("test");

			var model = Backbone.Model.extend({
				defaults: {p: a1[0], r: marked(a2[0])}
			});

			var view = {
				p: new template.p({model:new model(), el : '#profile'}),
				r: new template.r({model:new model(), el : '#readme'})
			};
			alert("test2");
			view.p.render();
			view.r.render();

			$('#readme h1, #readme h2').each(function() {
				$('.sidebar-nav').append('<li><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></li>');
			});

			for (var i = 0; i < a1[0]['interests'].length; i++) {
				$('.bootstrap-tagsinput').append('<span class="tag label label-info">'+a1[0]['interests'][i].name+'</span>');
			};

			$('#readme h1, #readme h2').each(function() {
				$('.sidebar-nav').append('<li><a href="#'+$(this).attr('id')+'">'+$(this).text()+'</a></li>');
			});
		});
	}
};

app.on('initialize:after', function () {
	Backbone.history.start();
	// jQuery for page scrolling jQEasing
	$(function() {
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

	if(localStorage.getItem('menu')==='close'||typeof localStorage.getItem('menu')==='undefined')
		$("#sidebar-wrapper").removeClass("active");

	// Highlight the top nav as scrolling occurs
	$('body').scrollspy({
		target: '.navbar-fixed-top'
	})

	// Closes the Responsive Menu on Menu Item Click
	$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
	});

	// Closes the sidebar menu
	$("#menu-close").click(function(e) {
		sidebar.close(e);
	});

	// Opens the sidebar menu
	$("#menu-toggle").click(function(e) {
		sidebar.toggle(e);
	});

	// Scrolls to the selected menu item on the page
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	view.run();

});
