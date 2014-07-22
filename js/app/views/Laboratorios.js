define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorios.html'
], function ($,_,Backbone,laboratoriosTemplate) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboratoriosTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return LaboratoriosView;
})