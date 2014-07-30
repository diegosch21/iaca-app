define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/laboratorio_detalles.html',
	'views/Mapa',
	'collections/Labos'
], function ($,_,Backbone,laboTemplate,mapaView,labosCollection) {
	
	var LaboratoriosView = Backbone.View.extend({

		//precompilo el template
		template: _.template(laboTemplate),

		events: {
			
		},

		initialize: function(options) {
			this.mapaView = new mapaView();
			this.id_lab = options['id_lab'];
			this.collection = new labosCollection();
		},
		render: function() {
			this.$el.html(this.template());
			self = this;
			this.collection.fetch({
                success:function(){
                	self.model = self.collection.get(self.id_lab);
					self.mapaLabo();
                }
            });
			return this;
		},
		mapaLabo: function() {
			this.mapaView.setCenter(this.model.get('lat'),this.model.get('lng'));
			this.mapaView.setZoom(14);
			this.mapaView.render(this.$('#map_canvas')[0]);
			this.mapaView.setMarkers([this.model.toJSON()]);
		},
		botonBack: function(e) {
			
		}

	});

	return LaboratoriosView;
})