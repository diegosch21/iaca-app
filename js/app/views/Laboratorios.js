define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorios.html',
	'views/Mapa',
	'collections/Labos'
], function ($,_,Backbone,laboratoriosTemplate,mapaView,labosCollection) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboratoriosTemplate),

		events: {
			'touchend .labos-boton' : 'pressBoton',
			'mouseup .labos-boton' : 'pressBoton'
		},

		initialize: function() {
			this.mapaView = new mapaView();
			this.collection = new labosCollection();

        },
		render: function() {
			this.$el.html(this.template());
			self = this;
			this.collection.fetch({
                success:function(){
                	self.mapaTodos();
                }
            });
			return this;
		},
		mapaTodos: function() {
			this.mapaView.setCenter(-38.717607, -62.265389);  //Bahia Blanca
			this.mapaView.setZoom(13);
			this.mapaView.render(this.$('#map_canvas')[0]);
			this.mapaView.setMarkers(this.collection.toJSON());
            
		},
		pressBoton: function(e) {
			Backbone.history.navigate('laboratorios/'+$(e.currentTarget).data('lab'),true);
		}

	});

	return LaboratoriosView;
})