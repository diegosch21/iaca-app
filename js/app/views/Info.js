define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/info.html'
], function ($,_,Backbone,infoTemplate) {
	
	var InfoView = Backbone.View.extend({

		//precompilo el template
		template: _.template(infoTemplate),

		initialize: function() {
			
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return InfoView;
})