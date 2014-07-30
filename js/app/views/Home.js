define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html'
], function ($,_,Backbone,homeTemplate) {
	
	var HomeView = Backbone.View.extend({

		//precompilo el template
		template: _.template(homeTemplate),

		events: {
			'touchend .home-boton' : 'pressBoton',
			'mouseup .home-boton' : 'pressBoton'
		},

		initialize: function() {
			
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		pressBoton: function(e) {
			Backbone.history.navigate($(e.currentTarget).data('href'),true);
		},

		
	});

	return HomeView;
})