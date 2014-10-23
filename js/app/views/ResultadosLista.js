define([
	'text!templates/resultados_lista.html',
	'models/Sesion',
	'text!templates/alert.html',
	'collections/Resultados'
], function (resultadosListaTemplate,Sesion,alertTemplate,ResultadosCollection) {
	
	var ResultadosListaView = Backbone.View.extend({

		//precompilo el template
		template: _.template(resultadosListaTemplate),
		templateAlert: _.template(alertTemplate),

		initialize: function() {
			_.bindAll(this,"render");
			
			this.resultadosGuardados = new ResultadosCollection([],{userID: Sesion.get('userID')});
			this.listenTo(this.resultadosGuardados, 'add', this.addResultado);

			this.getListaGuardada();

			Sesion.on("change:timestamp",this.getListaGuardada,this);
			
			
		},

		render: function(fetched) {
			// CAMBIAR POR VISTA INDEPTE PARA CADA RESULT
			if(fetched)
				this.$el.html(this.template({nombre: Sesion.get("username"), lista: this.resultadosGuardados.toJSON()}));	
			else if(!Sesion.get("logueado")) {
				this.$el.html(this.template({nombre: "", lista: []}));	
			}
		
			return this;
		},
		getListaGuardada: function() {
			if(!Sesion.get("logueado")) {
				console.log("Deslogueado - lista resultados vacía")
				Backbone.history.navigate("home",true);
			}
			else {
				var self = this;
				console.log("Obtengo resultados guardados...")
				this.resultadosGuardados.fetch({
					success: function() {
						self.render(true);
						self.updateLista();
					},
					error: function(collection, response, options) { console.log(response)}
				});
			}
		},
		updateLista: function() {
			console.log("Actualizo lista de resultados...")
			this.loading(true);
			var self = this;
			Sesion.getResultados({
				success: function(data) {
					console.log("Cantidad resultados: "+data.list.length);
					var result = {};  
					_.each(data.list,function(element,index) {
						// Si en la colecc no está el result de ese protocolo (id) lo creo y guardo en storage
						if(!self.resultadosGuardados.get(element['protocolo'])) {
							// cambio nombres de algunas keys
							_.each(element, function(value, key) {
							    key = self.mapKeysResultado[key] || key;
							    result[key] = value;
							});
							console.log("Nuevo resultado: ")
							console.log(result);
							self.resultadosGuardados.create(result);
						}
					});
					self.render(true);
				},
				error: function(error) {
					console.log(error);
					self.$('#error-get-results').html(self.templateAlert({msj: error}));
				},
				complete: function() {
					self.loading(false);
				}
			});
		},
		mapKeysResultado: {
		    documento: "userID",
		    protocolo: "id"
		},
		loading: function(loading) {
			if(loading) {
				$('#loading-results').show();
			}
			else {
				$('#loading-results').hide();
			}
		},
		addResultado: function(result) {
			
		}
		
	});

	return ResultadosListaView;
})