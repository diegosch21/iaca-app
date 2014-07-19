define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header.html'
], function ($,_,Backbone,headerTemplate) {
	
	var HeaderView = Backbone.View.extend({

		//precompilo el template
		template: _.template(headerTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
		}

	});

	return HeaderView;
})