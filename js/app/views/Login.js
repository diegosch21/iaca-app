define([
	'text!templates/login.html',
	'models/Sesion',
	'text!templates/alert.html'

], function (loginTemplate,Sesion,alertTemplate) {
	
	var LoginView = Backbone.View.extend({

		//precompilo el template
		template: _.template(loginTemplate),
		templateAlert: _.template(alertTemplate),

		initialize: function(options) {
			if(options && options['redireccion'])
				this.redireccion  = options['redireccion'];
			else
				this.redireccion = 'home';
			this.options = options || {};
			_.bindAll(this,'login');
		},

		events: {
			'submit form#login'	: 'login'
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
			self.$('.mensaje--alerta').html('');
			
			if(username!="" && password!="") {
				this.loading(true);
				Sesion.login(username,password,{
					success: function(data) {
						console.log("Logueado: "+Sesion.get("logueado")+" Redirecciona a: "+self.redireccion);
						Backbone.history.navigate(self.redireccion,true);
					},
					error: function(error) {
						self.$('.mensaje--alerta').html(self.templateAlert({msj: error}));
					},
					complete: function() {
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