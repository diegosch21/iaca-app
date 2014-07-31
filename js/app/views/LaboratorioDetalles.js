define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorio_detalles.html',
	'lib/gmaps'
], function ($,_,Backbone,laboTemplate,mapa) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboTemplate),

		events: {
			'touchend #back' : 'botonBack',
			'click #back' : 'botonBack'
		},

		initialize: function(options) {
			this.mapa = options['mapa'];
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			self= this;
			setTimeout(function() {
				self.mapaLabo();
			},0);
            return this;
		},
		mapaLabo: function() {
			this.mapa.setCenter(this.model.get('lat'),this.model.get('lng'));
			this.mapa.setZoom(14);
			this.mapa.render(this.$('#map_canvas')[0]);
			this.mapa.setMarkers([this.model.toJSON()]);

		},
		botonBack: function(e) {
			Backbone.history.navigate('laboratorios',true);
		}

	});

	return LaboratoriosView;
})