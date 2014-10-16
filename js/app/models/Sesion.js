/*
*	Guarda el token del usuario actual
*  SINGLETON
*/
define([
	'localstorage'
], function() {

    var sesionModel = Backbone.Model.extend({
        
        defaults:{
        	id: 'unic',
        	actualUser: '',
        	logueado: false,
        	user: "",
        	token: ""
        },

        urls: {
        	login: 'http://jsonp.nodejitsu.com/?url=http://iaca3.web.vianetcon.com.ar/ws.json!login!',
        	results: 'http://jsonp.nodejitsu.com/?url=http://iaca3.web.vianetcon.com.ar/ws.json!list-results!'
        },

        localStorage: new Backbone.LocalStorage('iaca-session'),

        initialize: function() {
        	_.bindAll(this,'getAuth','login');
        },

        login: function(user,pass,callback) {
        	var self = this;
        	this.getAuth(user,pass,{
        		success: function(data) {
        			//crear usuario
        			console.log('crear usuario');
        			self.crearUsuario(data);
        			if (callback && 'success' in callback) {
        				callback.success(data);
        			}
        		},
        		error: function(error) {
        			console.log('Error' + error);
        			if (callback && 'error' in callback) {
        				callback.error(error);
        			}
        		},
        		complete: function() {
        			if (callback && 'complete' in callback) {
        				callback.complete();
        			}
        		}
        	});
        },



        getAuth: function(user,pass,callback) {
        	var self = this;
        	$.ajax({
        		url: this.urls.login+"username="+user+"&password="+pass,
        		dataType: 'json',
        		type: 'GET'
        	}).done(function(data, textStatus, jqXHR){
        		console.log(data);
        		if(data.result && data.name != null) {
        			if (callback && 'success' in callback) {
        				callback.success(data);
        			}
        		}
        		else if (data.result && data.name==null) {
        			callback.error('Usuario inválido');
        		}	
        		else {
        			if (callback && 'error' in callback) {
        				switch(data.errorcode) {
        					case 1: 
        						callback.error('Usuario o clave inválidos');
        						break;
        					case -1: 
        						callback.error('Ocurrió un error en la base de datos. Intente de nuevo.')	
        						break;
        					default:
        						callback.error("Error desconocido. Intente de nuevo.")	
        				}
        			} 
        		}
        	}).fail(function( jqXHR, textStatus, errorThrown ) {
        		console.log(jqXHR + textStatus + errorThrown);
        		if (callback && 'error' in callback) {
        			callback.error('No se pudo comunicar con el servidor. Intente de nuevo');
        		} 
        	}).always(function(){
        		if (callback && 'complete' in callback) {
        			callback.complete();
        		}
        	});
        },

        crearUsuario: function(data) {
        	this.actualUser = data.name;
        	this.logueado = true;
        	this.token = data.token;
        	this.save();
        }



        

    });
    return new sesionModel;

});
