define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/resultados_lista.html'
], function ($,_,Backbone,resultadosListaTemplate) {
	
	var ResultadosListaView = Backbone.View.extend({

		//precompilo el template
		template: _.template(resultadosListaTemplate),

		initialize: function() {
			
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return ResultadosListaView;
})