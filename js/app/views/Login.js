define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login.html'
], function ($,_,Backbone,loginTemplate) {
	
	var LoginView = Backbone.View.extend({

		//precompilo el template
		template: _.template(loginTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		
	});

	return LoginView;
})