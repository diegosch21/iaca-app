define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/header.html'
], function ($,_,Backbone,headerTemplate,fixHeader) {
	
	var HeaderView = Backbone.View.extend({

		//precompilo el template
		template: _.template(headerTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template({logueado: true, user: "Diego Martín Schwindt"}));
			return this;
		},

		selectMenuItem: function (menuItem) {
			$('.app-header-menu li').removeClass('activo');
			$('#menu-principal-xs span.menu-principal-xs-activo').hide();
	        if (menuItem) {
	            $('#menuitem-' + menuItem).addClass('activo');
	            $('#menu-principal-xs-'+ menuItem).show();
        }
    }

	});

	return HeaderView;
})