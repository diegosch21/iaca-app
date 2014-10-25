define([
	'text!templates/resultado_item.html',
	'models/Sesion'
], function (resultadoItemTemplate,Sesion) {
	
	var ResultadoItemView = Backbone.View.extend({

		//precompilo el template
		template: _.template(resultadoItemTemplate),

		tagName: 'li',
		className: "item--resultado_paciente row",

		initialize: function() {

		},
		events: {
			'click .leido i' : 	'changeLeido',
			'click .boton_pdf': 'openPDF'
		},

		render: function() {
			console.log("Render ResultadoItemView id: "+this.model.id);
			this.$el.html(this.template(this.model.toJSON()));
			this.marcarLeido();
			return this;
		},

		changeLeido: function() {
			this.model.save({'leido': !this.model.get('leido')});
			console.log("changeLeido: "+this.model.get('leido'));
			this.marcarLeido();
		},
		setLeido: function() {
			this.model.save({'leido': true});
			console.log("setLeido: "+this.model.get('leido'));
			this.marcarLeido();
		},
		marcarLeido: function() {
			if(this.model.get("leido")) {
				this.$el.addClass('leido_si');
				this.$el.removeClass('leido_no');
			}
			else {
				this.$el.addClass('leido_no');	
				this.$el.removeClass('leido_si');
			}
		},
		openPDF: function(event) {
			var url= ($(event.currentTarget).data('href'));
			var url_sintoken = url.substring(0,url.lastIndexOf('=')+1);
			var url_contoken = url_sintoken + Sesion.get('token');
			console.log("Open PDF - url token actualizado: "+url_contoken);
			window.open(url_contoken, '_system');
			event.preventDefault();

			// SI NO ABRE, HACER RELOGIN
			
			this.setLeido();
		}
		
	});

	return ResultadoItemView;
})