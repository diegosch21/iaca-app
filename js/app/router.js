define([
	'app/views/Header',
	'iscroll'
], function (HeaderView,IScroll) {
	
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
        	this.loading = _.bind(loading,this);
		},

		home: function(){
			var self = this;
			this.loading(true);
			require(['views/Home'], function(HomeView) {
				self.cambiarPagina(new HomeView(),'inicio');	
			});
		},
		resultados: function(){
			var self = this;
			this.loading(true);
			require(['views/ResultadosLista'], function(ResultadosView) {
				self.cambiarPagina(new ResultadosView(),'resultados');	
			});
		},
		configuracion: function(){
			var self = this;
			this.loading(true);
			require(['views/Config'], function(ConfigView) {
				self.cambiarPagina(new ConfigView(),'configuracion');	
			});
		},
		laboratorios: function(){
			var self = this;
			this.loading(true);
			//require(['views/Laboratorios','lib/gmaps'], function(LaboratoriosView,Mapa) {
			require(['views/Laboratorios'], function(LaboratoriosView) {
				console.log(1);	
				self.getLabos(function() {
					// if(!self.mapa)
					//   	self.mapa = new Mapa();
					self.cambiarPagina(new LaboratoriosView({
							//mapa: self.mapa,
							collection: self.labosCollection
						}),'laboratorios');	
				});
			});
		},
		verLabo: function(lab){
			var self = this;
			this.loading(true);
			//require(['views/LaboratorioDetalles','lib/gmaps'], function(LaboView,Mapa) {
			require(['views/LaboratorioDetalles'], function(LaboView) {
				self.getLabos(function() {
					var labo = self.labosCollection.get(lab);
					// if(!self.mapa)
					//  	self.mapa = new Mapa();
					self.cambiarPagina(new LaboView({
							//mapa: self.mapa,
							model: labo
						}),'laboratorios');	
				});	
			});
		},
		info: function(){
			var self = this;
			this.loading(true);
			require(['views/Info'], function(InfoView) {
				self.cambiarPagina(new InfoView(),'info');	
			});
		},
		datos: function(){
			var self = this;
			this.loading(true);
			require(['views/Datos'], function(DatosView) {
				//self.datosView = new DatosView();
				self.cambiarPagina(new DatosView(),'configuracion');	
			});
		},
		login: function() {
			var self = this;
			this.loading(true);
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
		//console.log(4);

		$('#content').html(view.render().el);
		this.currentView = view;
		//console.log(8);
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
		//console.log(9);
		var self = this;
		$('.loading').on('load',function(){
			$(this).removeClass("loading");
        	self.scroller.refresh();
		});
		this.loading(false);
		
		return view;
	};

	function loading (loading) {
		if(loading) {
			$('#page-loading').show();
		}
		else {
			$('#page-loading').hide();
		}
	}

	/* Crea la colleccion de labos si no existe y hace fetch la primera vez. Luego llama al callback (que puede usar this.collction) */
	function getLabos(callback) {
		var self = this;
		require(['collections/Labos'], function(LabosCollection) {
			if (self.labosCollection) {
				console.log(21);
	        	if (callback) callback();
	    	}
	    	else {
	    		self.labosCollection = new LabosCollection();
	            self.labosCollection.fetch({
	            	success:function () {
	            		console.log(22);
	            		if (callback) callback();
	        		}
	        	});
	    	}
	    });
	};

	

	return appRouter;
});