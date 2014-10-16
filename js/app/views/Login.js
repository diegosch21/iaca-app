define([
	'text!templates/login.html',
	'models/Sesion',
	'text!templates/alert.html'

], function (loginTemplate,Sesion,alertTemplate) {
	
	var LoginView = Backbone.View.extend({

		//precompilo el template
		template: _.template(loginTemplate),
		templateAlert: _.template(alertTemplate),

		initialize: function() {
			_.bindAll(this,'login');
		},

		events: {
			'submit form#login'			: 'login'
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		login: function(evt) {
			var self = this;
			if(evt)
				evt.preventDefault();
			var username = this.$("#usuario").val();
			var password = this.$("#pass").val();
			
			if(username!="" && password!="") {
				this.loading(true);
				Sesion.login(username,password,{
					success: function(data) {
						console.log("login OK");
					},
					error: function(error) {
						self.$('.mensaje--alerta').html(self.templateAlert({msj: error}));
					},
					complete: function() {
						console.log(self);
						self.loading(false);
					}
				});
			}
		},

		loading: function(loading) {
			if(loading) {
				$('#page-loading').show();
			}
			else {
				$('#page-loading').hide();
			}
		},



		
	});

	return LoginView;
})