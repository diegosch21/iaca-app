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
			'click .home-boton' : 'clickBoton',
			'touchstart .home-boton': 'activarBoton',
			'touchend .home-boton': 'desactivarBoton'
		},

		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		clickBoton: function(e) {
			Backbone.history.navigate($(e.currentTarget).data('href'),true);
		},
		activarBoton: function(e) {
			$(e.currentTarget).addClass('activo');
		},
		desactivarBoton: function(e) {
			$(e.currentTarget).removeClass('activo');
		}
		
	});

	return HomeView;
})