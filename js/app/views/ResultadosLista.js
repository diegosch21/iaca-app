define([
	'text!templates/resultados_lista.html',
	'models/Sesion'
], function (resultadosListaTemplate,Sesion) {
	
	var ResultadosListaView = Backbone.View.extend({

		//precompilo el template
		template: _.template(resultadosListaTemplate),

		initialize: function() {
			this.getLista();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		getLista: function() {
			this.loading(true);
			var self = this;
			Sesion.getResultados({
				success: function(data) {
					console.log("Cantidad resultados: "+data.list.length);
				},
				error: function(error) {
					console.log(error);
				},
				complete: function() {
					self.loading(false);
				}
			});
		},
		loading: function(loading) {
			if(loading) {
				$('#loading-results').show();
			}
			else {
				$('#loading-results').hide();
			}
		}
		
	});

	return ResultadosListaView;
})