define([
	'jquery',
	'backbone',
	'app/views/Header',
	'iscroll'
], function ($, Backbone, HeaderView,IScroll) {
	
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
        	this.getLabos = _.bind(getLabos,this);
		},

		home: function(){
			var self = this;
			require(['views/Home'], function(HomeView) {
				self.cambiarPagina(new HomeView(),'inicio');	
			});
		},
		resultados: function(){
			var self = this;
			require(['views/ResultadosLista'], function(ResultadosView) {
				self.cambiarPagina(new ResultadosView(),'resultados');	
			});
		},
		configuracion: function(){
			var self = this;
			require(['views/Config'], function(ConfigView) {
				self.cambiarPagina(new ConfigView(),'configuracion');	
			});
		},
		laboratorios: function(){
			var self = this;
			require(['views/Laboratorios','lib/gmaps'], function(LaboratoriosView,Mapa) {
				self.getLabos(function() {
					if(!self.mapa)
					  	self.mapa = new Mapa();
					self.cambiarPagina(new LaboratoriosView({collection: self.labosCollection,mapa: self.mapa}),'laboratorios');	
				});
			});
		},
		verLabo: function(lab){
			var self = this;
			require(['views/LaboratorioDetalles','lib/gmaps'], function(LaboView,Mapa) {
				self.getLabos(function() {
					var labo = self.labosCollection.get(lab);
					if(!self.mapa)
					 	self.mapa = new Mapa();
					self.cambiarPagina(new LaboView({model: labo,mapa: self.mapa}),'laboratorios');	
				});	
			});
		},
		info: function(){
			var self = this;
			require(['views/Info'], function(InfoView) {
				self.cambiarPagina(new InfoView(),'info');	
			});
		},
		datos: function(){
			var self = this;
			require(['views/Datos'], function(DatosView) {
				//self.datosView = new DatosView();
				self.cambiarPagina(new DatosView(),'configuracion');	
			});
		},
		login: function() {
			var self = this;
			require(['views/Login'], function(LoginView) {
				//self.loginView = new view();
				self.cambiarPagina(new LoginView(),'inicio');	
			});
		}
	});

	function cambiarPagina(view,menuitem) {
		this.headerView.selectMenuItem(menuitem);
		if (this.currentView)
			this.currentView.remove();

		$('#content').html(view.render().el);
		this.currentView = view;

		if(this.scroller)
			this.scroller.destroy();				
		this.scroller = new IScroll('#content-wrapper', {
		    mouseWheel: true,
		    scrollbars: true,
		    interactiveScrollbars: true,
			fadeScrollbars: true,
			bounce: false,
			checkDOMChanges:true
		});	

		var self = this;
		$('.loading').on('load',function(){
        	$(this).removeClass("loading");
        	self.scroller.refresh();
		});
		
		return view;
	};

	/* Crea la colleccion de labos si no existe y hace fetch la primera vez. Luego llama al callback (que puede usar this.collction) */
	function getLabos(callback) {
		var self = this;
		require(['collections/Labos'], function(LabosCollection) {
			if (self.labosCollection) {
	        	if (callback) callback();
	    	}
	    	else {
	    		self.labosCollection = new LabosCollection();
	            self.labosCollection.fetch({
	            	success:function () {
	            		if (callback) callback();
	        		}
	        	});
	    	}
	    });
	};

	

	return appRouter;
});