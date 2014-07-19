require.config({

	baseUrl: 'js/vendor',

	paths: {
        app: '../app',
        templates: '../../templates',
        jquery: 'jquery-1.11.1.min',
        underscore: 'underscore-1.6.0.min',
        backbone: 'backbone-1.1.2.min',
        backboneLocalstorage: 'backbone.localStorage-min',
        modernizr: 'modernizr-2.8.0.min',
        text: 'requirejs-text'
    }, 

	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	}
});

require(['jquery', 'backbone', 'app/router', 'modernizr'], 
	function ($, Backbone, Router) {

	   	var router = new Router();

	    $("body").on("click", ".back-button", function (event) {
	        event.preventDefault();
	        window.history.back();
	    });

	    Backbone.history.start();
});