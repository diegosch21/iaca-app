define([
	'jquery',
	'backbone',
	'app/views/Header'
], function ($, Backbone, HeaderView) {
	
	var appRouter = Backbone.Router.extend({
		routes: {
			""					: "home",
			"home"				: "home",
			"resultados"		: "resultados",
			"configuracion"		: "configuracion",
			"laboratorios"		: "laboratorios",
			"laboratorios/*lab"	: "verLabo",
			"info"				: "info",
			"datos"				: "datos",
			"login"				: "login"
		},

		initialize: function(){
			this.headerView = new HeaderView();
        	$('#header').html(this.headerView.el);
        	this.cambiarPagina = _.bind(cambiarPagina,this);        	
		},

		home: function(){
			var self = this;
			require(['views/Home'], function(view) {
				self.homeView = new view();
				self.cambiarPagina(self.homeView,'inicio',true);	
			});
			
		},
		resultados: function(){
			var self = this;
			require(['views/ResultadosLista'], function(view) {
				self.resultadosView = new view();
				self.cambiarPagina(self.resultadosView,'resultados');	
			});
		},
		configuracion: function(){
			var self = this;
			require(['views/Config'], function(view) {
				self.configView = new view();
				self.cambiarPagina(self.configView,'configuracion');	
			});
		},
		laboratorios: function(){
			var self = this;
			require(['views/Laboratorios'], function(view) {
				self.laboratoriosView = new view();
				self.cambiarPagina(self.laboratoriosView,'laboratorios');	
			});
		},
		verLabo: function(lab){
			var self = this;
			require(['views/LaboratorioDetalles'], function(view) {
				self.laboView = new view({id_lab: lab});
				self.cambiarPagina(self.laboView,'laboratorios');	
			});
		},
		info: function(){
			var self = this;
			require(['views/Info'], function(view) {
				self.infoView = new view();
				self.cambiarPagina(self.infoView,'info');	
			});
		},
		datos: function(){
			var self = this;
			require(['views/Datos'], function(view) {
				self.datosView = new view();
				self.cambiarPagina(self.datosView,'configuracion');	
			});
		},
		login: function() {
			var self = this;
			require(['views/Login'], function(view) {
				self.loginView = new view();
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