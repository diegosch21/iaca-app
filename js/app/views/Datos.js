define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/datos.html'
], function ($,_,Backbone,datosTemplate) {
	
	var DatosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(datosTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return DatosView;
})