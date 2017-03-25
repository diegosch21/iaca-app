/**
 * Provee métodos para login de usuario y request de lista de resultados,
 *     usando el WebService del sistema Shift, manejando el protocolo SOAP.
 *     Se encarga de armar los request y parsear los responses
 * [SINGLETON]
 */
define([
    'jquery'
],function() {
	// URL del web service
	var ws_url = "http://181.30.97.58/shift/lis/iaca/elis/s01.util.b2b.integracaoMobile.Webserver.cls";
	// var ws_url = "proxy/Shift_SOAP.php"; // para desarrollo

	var ShiftWS = function() {

        console.log("Init ShiftWS service. WS URL: "+ws_url);

        /**
         * Realiza el request al método wsLogin para credenciales validar usuario
         * @param  string user_id identificacion de usuario
         * @param  string user_pass contraseña de usuario
         * @param  object callbacks { success, error, complete } funciones a ejecutar dependiendo del resultado de la ejecucion
         */
        this.login = function(user_id,user_pass,callbacks) {
            console.log('Shift WS: login');
        };

        /**
         * Realiza el request al método wsLogin para obtener la lista de resultados de analisis y el nombre del paciente
         * @param object user model Usuario del que obtiene id y pass para hacer el reques
         * @param object callbacks { success, error, complete } funciones a ejecutar dependiendo del resultado de la ejecucion
         */
        this.getResultados = function(callbacks) {
            console.log('Shift WS: getResultados');
        };

	};

	return new ShiftWS();  //SINGLETON
});

/* URLs viejo sistema (VIANET) */
// urls: {
//     // login: 'https://www.iaca.com.ar/ws.json!login!',
//     // results: 'https://www.iaca.com.ar/ws.json!list-results!'

//     /* Proxy local a VIANET (para desarrollo, por same-origin-policy) */
//     // login: 'http://imotion.local/iaca/iaca-www/proxy/VIANET_login.php?',
//     login: 'proxy/VIANET_login.php?',
//     // login: 'proxy/login_18277932.json?',
//     // results: 'http://imotion.local/iaca/iaca-www/proxy/VIANET_results.php?'
//     results: 'proxy/VIANET_results.php?'
//     // results: 'proxy/results_18277932_2.json?'
//     // results: 'proxy/results_vacio.json?'
// }