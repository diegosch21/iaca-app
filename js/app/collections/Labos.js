define([
    'jquery',
    'underscore',
    'backbone',
    'models/Labo'
], function($, _, Backbone, laboModel){
    var mapCollection = Backbone.Collection.extend({
        initialize: function(){
        
        },
        model: laboModel,

        url: 'data/labos.json',

        
    });

    return mapCollection;
});
