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
			"info"			: "info"
		},

		initialize: function(){
			this.headerView = new HeaderView();
        	$('#header').html(this.headerView.el);
		},

		home: function(){
			this.headerView.selectMenuItem('inicio');
		},
		resultados: function(){
			this.headerView.selectMenuItem('resultados');
		},
		configuracion: function(){
			this.headerView.selectMenuItem('configuracion');
		},
		laboratorios: function(){
			this.headerView.selectMenuItem('laboratorios');
		},
		info: function(){
			this.headerView.selectMenuItem('informacion');
		}
	})
	return appRouter;
});