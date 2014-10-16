define([
    'models/Usuario',
    'localstorage'
], function(usuarioModel){
    var usuariosCollection = Backbone.Collection.extend({
        initialize: function(){
        
        },
        model: usuarioModel,

        localStorage: new Backbone.LocalStorage('iaca-usuarios')

        
    });

    //SINGLETON
    return new usuariosCollection;
});