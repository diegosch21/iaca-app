require.config({

	baseUrl: 'js/vendor',

	paths: {
        app: '../app',
        lib: '../app/lib',
        templates: '../../templates',
        data: '../../data',
        views: '../app/views',
        models: '../app/models',
        collections: '../app/collections',
        text: 'requirejs-text',
        async: 'requirejs-async',
        jquery: 'jquery-1.11.1.min',
        underscore: 'underscore-1.6.0.min',
        backbone: 'backbone-1.1.2.min',
        localstorage: 'backbone.localStorage-min',
        modernizr: 'modernizr-2.8.0.min',
        bootstrap: 'bootstrap-3.2.0.min',
        iscroll: 'iscroll'
    }, 
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		localstorage: {
			deps: ['backbone'],
			exports: 'Store'
		},
		bootstrap: {
			deps: ['jquery']
		},
		iscroll: {
			exports: 'IScroll'
		}
	},
	waitSeconds: 20
});

require(['jquery', 'backbone', 'app/router', 'modernizr', 'bootstrap'], 
	function ($, Backbone, Router) {

	   	var router = new Router();

	    $('body').on("touchend", function (event) {
		     console.log("touchend "+event.target.tagName +' '+event.target.id +' '+ event.target.className);    
		 })
	    $('body').on("click", function (event) {
		     console.log("click "+event.target.tagName +' '+event.target.id +' '+ event.target.className);    
		 })
		Backbone.history.start();

		eventHandlersGenerales();
		
	}	
);

function eventHandlersGenerales() {
	$(document).on('touchmove', function (e) { e.preventDefault(); });
	$('body').on("mousedown touchstart",'.boton', function (e) {
	//$('body').on("touchstart",'.boton', function (e) {
		$(e.currentTarget).addClass('activo');
		e.stopPropagation();
		console.log("activo "+e.target.tagName +' '+e.target.id +' '+ e.target.className);    
	});
	$('body').on("mouseup touchend",'.boton', function (e) {
	// $('body').on("touchend",'.boton', function (e) {
		$('.boton').removeClass('activo');
		e.stopPropagation();
		console.log("desactivo "+e.target.tagName +' '+e.target.id +' '+ e.target.className);    
	});	
	$('body').on('mouseup touchend touchmove', function(e) {
	// $('body').on('touchend touchmove', function(e) {
		$('.boton').removeClass('activo');
	});

}

