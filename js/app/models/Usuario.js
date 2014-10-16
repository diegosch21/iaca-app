define(function() {

    var userModel = Backbone.Model.extend({
        defaults:{
        	id: "0",
        	name: "",
        	pass: ""
        }
    });
    return userModel;

});
