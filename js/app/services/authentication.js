/**
 * [SINGLETON Service]
 * Maneja estado de usuario actual, mantiendo referencia al mismo [reemplaza viejo model Sesion]
 *     (se necesita user y pass para requests a web service)
 * Obtiene de localstorage id de usuario de login previo
 * Realiza el login de usuario (utilizando shift_webservice).
 */
define([
    'underscore',
    'backbone',
    'services/shift_webservice',
    'collections/Usuarios'
], function(_,Backbone,ShiftWS, Usuarios) {

    var Auth = function() {

        // Inicializo datos
        this.logueado = false;
        this.user = null; // Referencia a model Usuario
        this.username = ''; // Shortcut a nombre de usuario (accedido desde HeaderView)
        // Configuro objeto para poder lanzar y bindear eventos de backbone
        _.extend(this, Backbone.Events);

        // Inicializo "sesión"
        init();

        // Función privada, para inicializar "Sesión":
        //  Intenta obtener id de usuario previamente logueado (en ejecuciones anteriores de la app)
        //  Si está, setea usuario
        function init() {
            console.log("Init Auth service");

            // ToDo consultar si hay id de usuario previamente logueado
        }


        /** Login: hace request a Shift con datos de usuario.
         *      Si es OK, hace request a lista resultados para precargar data y obtener nombre de usuario, invocando setUsuario
         *      Si es erroneo, informa
         * @param  string user_id identificacion de usuario
         * @param  string user_pass contraseña de usuario
         * @param  object callbacks { success, error, complete } funciones a ejecutar dependiendo del resultado de la ejecucion
         */
        this.login = function(user_id,user_pass,callbacks) {
            console.log("Auth: Login");

            // Realizo request a Shift.
            ShiftWS.login(user_id,user_pass,{ // Defino nuevos callbacks que ejecutan los recibidos en parametro
                success: function(data) {
                    // Ejecuto callback recibido
                    if (callbacks && 'success' in callbacks) {
                        callbacks.success(data);
                    }
                },
                error: function(errormsj,errorcode) {

                    // ToDo check errorcode
                    // Ejecuto callback recibido
                    if (callbacks && 'error' in callbacks) {
                        callbacks.error(errormsj);
                    }
                },
                complete: function() {
                    // Ejecuto callback recibido
                    if (callbacks && 'complete' in callbacks) {
                        callbacks.complete();
                    }
                }
            });
            // ToDo luego de login por primera vez (desde iniciar sesion), forzar redirect a lista de resultados donde se va a obtener nombre de usuario
            // Si era usuario previamente logueado ya deberia tener el nombre
        };

        /**
         * Crea o actualiza usuario (en la coleccion Usuarios)
         *     y guarda id del usuario en localstorage para futuras ejecuciones de la app
         */
        this.setUsuario = function () {

        };

        this.getUserId = function() {
            if (this.user)
                return this.user.id;
            else return null;
        };

        /** Logout: quita usuario actual en sesion y quita id de localstorage (sin eliminar data del usuario) */
        this.logout = function() {
            // ToDo
            console.log("logout");

            this.logueado = false;
            this.user = null;
            this.username = null;
        };

    };

    return new Auth();  //SINGLETON
});