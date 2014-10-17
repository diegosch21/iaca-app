define([
	'text!templates/home.html',
	'models/Sesion'
], function (homeTemplate,Sesion) {
	
	var HomeView = Backbone.View.extend({

		//precompilo el template
		template: _.template(homeTemplate),

		events: {
			'touchend .home-boton' : 'pressBoton',
			'click .home-boton' : 'pressBoton',
			'touchmove .home-boton' : 'touchMove'
		},

		initialize: function() {
			this.dragging = false;
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		pressBoton: function(e) {
			console.log('pressBoton (dragging: '+this.dragging);
			if(this.dragging)
				this.dragging = false;
			else
				Backbone.history.navigate($(e.currentTarget).data('href'),true);
		},
		touchMove: function() {
			this.dragging = true;
		}

		
	});

	return HomeView;
})