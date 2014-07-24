define([
	'jquery',
	'backbone',
	'app/views/Header'
], function ($, Backbone, HeaderView) {
	
	var appRouter = Backbone.Router.extend({
		routes: {
			""				: "home",
			"home"			: "home",
			"resultados"	: "resultados",
			"configuracion"	: "configuracion",
			"laboratorios"	: "laboratorios",
			"info"			: "info",
			"datos"			: "datos",
			"login"			: "login"
		},

		initialize: function(){
			this.headerView = new HeaderView();
        	$('#header').html(this.headerView.el);
        	this.cambiarPagina = _.bind(cambiarPagina,this);        	
		},

		home: function(){
			var self = this;
			require(['app/views/Home'], function(view) {
				//if (!self.homeView) {
				self.homeView = new view();
				//}
				self.cambiarPagina(self.homeView,'inicio');	
			});
			
		},
		resultados: function(){
			var self = this;
			require(['app/views/ResultadosLista'], function(view) {
				// if (!self.resultadosView) {
				self.resultadosView = new view();
				// }
				self.cambiarPagina(self.resultadosView,'resultados');	
			});
		},
		configuracion: function(){
			var self = this;
			require(['app/views/Config'], function(view) {
				// if (!self.configView) {
				self.configView = new view();
				// }
				self.cambiarPagina(self.configView,'configuracion');	
			});
		},
		laboratorios: function(){
			var self = this;
			require(['app/views/Laboratorios'], function(view) {
				// if (!self.laboratoriosView) {
				self.laboratoriosView = new view();
				// }
				self.cambiarPagina(self.laboratoriosView,'laboratorios');	
			});
		},
		info: function(){
			var self = this;
			require(['app/views/Info'], function(view) {
				// if (!self.infoView) {
				self.infoView = new view();
				// }
				self.cambiarPagina(self.infoView,'info');	
			});
		},
		datos: function(){
			var self = this;
			require(['app/views/Datos'], function(view) {
				// if (!self.datosView) {
				self.datosView = new view();
				// }
				self.cambiarPagina(self.datosView,'configuracion');	
			});
		},
		login: function() {
			var self = this;
			require(['app/views/Login'], function(view) {
				// if (!self.loginView) {
				self.loginView = new view();
				// }
				self.cambiarPagina(self.loginView,'inicio');	
			});
		}
	})

	function cambiarPagina(view,menuitem) {
		this.headerView.selectMenuItem(menuitem);
		if (this.currentView)
			this.currentView.remove();
		$('#content').html(view.render().el);
		this.currentView = view;
		return view;
	}

	return appRouter;
});