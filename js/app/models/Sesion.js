/*
*	Guarda el token del usuario actual
*  SINGLETON
*/
define([
 	'jquery',
 	'underscore',
 	'backbone',
 	'localstorage',
 	'collections/Usuarios'
], function ($,_,Backbone,Store,Usuarios) {	

    var sesionModel = Backbone.Model.extend({
        
        defaults:{
        	id: 'unic',
        	logueado: false,
        	userID: -1,
        	username: "",
        	token: ""
        },

        urls: {
        	//login: 'http://iaca3.web.vianetcon.com.ar/ws.json!login!',
        	//login: 'http://localhost/iaca/iaca-www/proxy_login.php?',
            login: 'http://192.168.1.100/iaca/iaca-www/proxy_login.php?',
        	//results: 'http://iaca3.web.vianetcon.com.ar/ws.json!list-results!'
        	//results: 'http://localhost/iaca/iaca-www/proxy_results.php?',
            results: 'http://192.168.1.100/iaca/iaca-www/proxy_results.php?'
        },

        localStorage: new Store('iaca-session'),

        initialize: function() {

        	console.log("Initialize Sesion");
        	_.bindAll(this,'getAuth','login','crearUsuario','setUsuario');

        	if(localStorage.getItem('iaca-session-unic')) {
        		console.log("Init: Fetch sesion")
        		this.fetch();	
                //relogin
        	}
        	else {
        		console.log("Init: Save sesion")
        		this.save();
        	};
        },

        login: function(user,pass,callback) {
        	var self = this;
        	this.getAuth(user,pass,{
        		success: function(data) {
                    console.log("Login OK");
        			self.setUsuario(user,pass,data);
        			if (callback && 'success' in callback) {
        				callback.success(data);
        			}
        		},
        		error: function(error) {
        			console.log('Error: ' + error);
        			console.log("CantLogin");
        			self.logout();
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

        relogin: function() {

        }



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

        setUsuario: function(id,pass,data) {
			
			//Si no existe el usuario, lo creo
			if(!Usuarios.get(id))
				this.crearUsuario(id,data.name,pass);
            else {
                console.log("El usuario ya existe en la coleccion");
            }
			console.log("Set usuario logueado: "+id+" "+data.name+" ,token: "+data.token);
			this.set("userID",id);
			this.set("username",data.name);
			this.set("token",data.token);
			this.set("logueado",true);
        	this.save();
        },

        logout: function() {
        	this.set("token","");
        	this.set("userID",-1);
			this.set("username","");
			this.set("logueado",false);
        	this.save();
        	console.log("Logueado: "+false);
        },

        crearUsuario: function(id,name,pass) {
            console.log("Creo usuario id:"+id);
            Usuarios.create({id: id, name: name, pass: pass})
        }



        

    });
    return new sesionModel;

});
