define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorios.html',
	//'views/Mapa',
	'lib/gmaps',
	'collections/Labos'
], function ($,_,Backbone,laboratoriosTemplate,mapa,labosCollection) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboratoriosTemplate),

		events: {
			'touchend .labos-boton' : 'pressBoton',
			'click .labos-boton' : 'pressBoton',
			'touchmove .labos-boton' : 'touchMove'
		},

		initialize: function(options) {
			this.dragging = false;
			this.mapa = options['mapa'];
        },
		render: function() {
			this.$el.html(this.template());
			self = this;
			setTimeout(function() {
				self.mapaTodos();
			},0);
            return this;
		},
		mapaTodos: function() {
			this.mapa.setCenter(-38.717607, -62.265389);  //Bahia Blanca
			this.mapa.setZoom(13);
			this.mapa.render(this.$('#map_canvas')[0]);
			this.mapa.setMarkers(this.collection.toJSON());
            
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
		}


	});

	return LaboratoriosView;
})