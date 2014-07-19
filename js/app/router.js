define([
	'jquery',
	'backbone',
	'app/views/Header'
], function ($, Backbone, HeaderView) {
	
	var appRouter = Backbone.Router.extend({
		routes: {

		},

		initialize: function(){
			this.headerView = new HeaderView();
        	$('#header').html(this.headerView.el);
		}
	})
	return appRouter;
});