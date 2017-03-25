/**
 * [SINGLETON Service]
 * Provee métodos para realizar requests al webservice de Shift (usando JQuery AJAX), manejando el proocolo SOAP:
 *     - login de usuario
 *     - lista de resultados de usuario actual
 *     Define URLs, métodos, y bodies parametrizados para realizar los requests, y se encarga de parsear los responses
 */
define([
    'jquery'
],function($) {
	// URL del web service
	// var ws_url = "http://181.30.97.58/shift/lis/iaca/elis/s01.util.b2b.integracaoMobile.Webserver.cls";
	var ws_url = "proxy/Shift_SOAP.php"; // para desarrollo

    // Defino métodos (SOAPAction)
    var ws_method = {
        login: 'http://www.shift.com.br/s01.util.b2b.integracaoMobile.Webserver.WsLogin',
        resultado: 'http://www.shift.com.br/s01.util.b2b.integracaoMobile.Webserver.WsListaExPaciente'
    };

    // Defino request bodies, parametrizados con placeholders
    var ws_request_body = {
        login:
            '<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:www="http://www.shift.com.br">'+
                '<x:Header/>'+
                '<x:Body>'+
                    '<www:WsLogin>'+
                        '<www:pUserId>%user_id%</www:pUserId>'+
                        '<www:pSenha>%user_pass%</www:pSenha>'+
                        '<www:pTokenPN>%device_token%</www:pTokenPN>'+
                        '<www:pPlataforma>%platform%</www:pPlataforma>'+
                        '<www:pEstado></www:pEstado>'+
                    '</www:WsLogin>'+
                '</x:Body>'+
            '</x:Envelope>',

        resultados: ''
    };

	var ShiftWS = function() {

        console.log("Init ShiftWS service. WS URL: "+ws_url);

        /**
         * Realiza el request al método wsLogin para credenciales validar usuario
         * @param  string user_id identificacion de usuario
         * @param  string user_pass contraseña de usuario
         * @param  object callbacks { success, error, complete } funciones a ejecutar dependiendo del resultado de la ejecucion
         */
        this.login = function(user_id,user_pass,callbacks) {
            console.log('Shift WS: login ',user_id,user_pass);

            var request_body = ws_request_body.login;
            // ToDo reemplazar placeholders y agregar platform y tokens

            $.ajax({
                url: ws_url,
                type: 'POST',
                contentType: 'text/xml; charset=utf-8',
                headers: {
                    'SOAPAction': ws_method.login
                },
                data: request_body,
                processData: false, // para que no modifique el request body
                dataType: 'xml' // formato retornado, para que jQuery lo parsee
            })
            .done(function(data){
                console.log(data);
            })
            .fail(function( jqXHR, textStatus, errorThrown ) {
                console.log(jqXHR.responseText +" "+ textStatus +" "+ errorThrown);
                if (callbacks && 'error' in callbacks) {
                    callbacks.error('No se pudo comunicar con el servidor. Verifique su conexión a internet.',0);
                }
            })
            .always(function(){
                if (callbacks && 'complete' in callbacks) {
                    callbacks.complete();
                }
            });
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