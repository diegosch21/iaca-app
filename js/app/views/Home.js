define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home.html'
], function ($,_,Backbone,homeTemplate) {
	
	var HomeView = Backbone.View.extend({

		//precompilo el template
		template: _.template(homeTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return HomeView;
})