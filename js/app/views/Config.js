define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/config.html'
], function ($,_,Backbone,configTemplate) {
	
	var ConfigView = Backbone.View.extend({

		//precompilo el template
		template: _.template(configTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return ConfigView;
})