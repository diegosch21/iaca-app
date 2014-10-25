define([
	'text!templates/info.html'
], function (infoTemplate) {
	
	var InfoView = Backbone.View.extend({

		//precompilo el template
		template: _.template(infoTemplate),

		events: {
			'click .external-link' : 'externalLink',
		},

		initialize: function() {
			
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},
		externalLink: function(event) {
			var url= ($(event.currentTarget).data('href'));
			window.open(url, '_system');
			event.preventDefault();
		}
		
	});

	return InfoView;
})