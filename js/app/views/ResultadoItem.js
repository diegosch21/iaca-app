define([
	'text!templates/resultado_item.html',
], function (resultadoItemTemplate) {
	
	var ResultadoItemView = Backbone.View.extend({

		//precompilo el template
		template: _.template(resultadoItemTemplate),

		tagName: 'li',
		className: "item--resultado_paciente row",

		initialize: function() {

		},
		events: {
			'click .leido i' : 	'changeLeido'
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
		marcarLeido: function() {
			if(this.model.get("leido")) {
				this.$el.addClass('leido_si');
				this.$el.removeClass('leido_no');
			}
			else {
				this.$el.addClass('leido_no');	
				this.$el.removeClass('leido_si');
			}
		}
		
	});

	return ResultadoItemView;
})