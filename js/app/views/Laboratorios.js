define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorios.html',
	//'lib/gmaps',
	'collections/Labos'
], function ($,_,Backbone,laboratoriosTemplate,labosCollection) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboratoriosTemplate),

		events: {
			'touchend .labos-boton' : 'pressBoton',
			'click .labos-boton' : 'pressBoton',
			'touchmove .labos-boton' : 'touchMove',
			'click #reload' : 'reloadMapa',
		},

		initialize: function(options) {
			console.log(3);
			this.dragging = false;
			//this.mapa = options['mapa'];
        },
		render: function() {
			console.log(5);
			this.$el.html(this.template());
			// self = this;
			// setTimeout(function() {
			// 	self.mapaTodos();
			// },0);
			this.mapaTodos();
            return this;
		},
		mapaTodos: function() {
			console.log(6);
			self = this;
			require(['lib/gmaps'], function(mapa) {
				$('#reload').hide();
				console.log(7);
				mapa.setCenter(-38.717607, -62.265389);  //Bahia Blanca
				mapa.setZoom(13);
				mapa.render(self.$('#map_canvas')[0]);
				mapa.setMarkers(self.collection.toJSON());
			});	
		},
		pressBoton: function(e) {
			console.log('pressBoton (dragging: '+this.dragging);
			if(this.dragging)
				this.dragging = false;
			else 
				Backbone.history.navigate('laboratorios/'+$(e.currentTarget).data('lab'),true);
		},
		touchMove: function() {
			this.dragging = true;
		},
		reloadMapa: function() {
			console.log("lalal");
			requirejs.undef('lib/gmaps');
			this.mapaTodos();
		}


	});

	return LaboratoriosView;
})