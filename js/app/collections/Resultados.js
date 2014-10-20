define([
    'jquery',
    'underscore',
    'backbone',
    'models/Usuario',
    'localstorage'
], function($,_,Backbone,usuarioModel,Store){
    var usuariosCollection = Backbone.Collection.extend({
        
        initialize: function(options){
            this.userID = options["userID"];
            console.log("Init resultadosCollection - userID: "+this.userID);
            this.fetch();
        },
        model: resultadoModel,

        localStorage: new Store('iaca-resultados-user'+this.userID)

    });

    return resultadosCollection;
});