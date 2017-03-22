define(['backbone'],function(Backbone) {

    var userModel = Backbone.Model.extend({
        defaults:{
        	id: 0,
        	name: "",
        	pass: "",
            logueado: false,
            // notificar: true, // opción para recibir o no notificaciones (no implementado)
            // notifID: 0 // id de registro de dispositivo para notificaciones (no implementado)
        }
    });
    return userModel;

});
