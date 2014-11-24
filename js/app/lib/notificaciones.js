define(
	function() {
		var Notificaciones = function() {
			var pushNotification = window.plugins.pushNotification;

			var addCallback = function(key, callback) {
  				if(window.callbacks == undefined) {
   					window.callbacks = {};
  				}
  				window.callbacks[key] = callback;
 			};

			this.registrarAndroid = function() {

			};
			var successHandlerAndroid = function(result) {
				console.log("PushPlugin: Success handler register en android. Result: "+result);
				alert("PushPlugin: Success handler register en android. Result: "+result);
				addCallback('onNotificationGCM',onNotificationGCM);	
			};
			var errorHandlerAndroid = function(error) {
				console.log("PushPlugin: Error handler register en android. Error: "+error);
				alert("PushPlugin: Error handler register en android. Error: "+error);	
			};
			var onNotificationGCM = function (e) {
				console.log("onNotificationGCM");
				alert("PushPlugin: onNotificationGCM");
				switch( e.event )
				{
					case 'registered':
						if ( e.regid.length > 0 )
						{
							alert("PushPlugin: registerID: " e.regid);
							//TODO: guardar en localstorage el regid para que login lo lea.
							//TODO: funcion en Sesion que haga ajax al server para enviar el token (si ya esta logueado)
							console.log("PushPlugin: regID: " + e.regid);
						}
						break;
					case 'message':
                    	// if this flag is set, this notification happened while we were in the foreground.
                    	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
                    	if (e.foreground)
                    	{
                    		console.log("PushPlugin - onNotificationGCM: Notificacion en foreground ");
			                //var soundfile = e.soundname || e.payload.sound;
			                // if the notification contains a soundname, play it.
			                // playing a sound also requires the org.apache.cordova.media plugin
			                //var my_media = new Media("/android_asset/www/"+ soundfile);
			                //my_media.play();
			            }
			            else
						{	// otherwise we were launched because the user touched a notification in the notification tray.
							if (e.coldstart)
								console.log("PushPlugin - onNotificationGCM: Notificacion - coldstart ");
							else
								console.log("PushPlugin - onNotificationGCM: Notificacion en background ");
						}

						alert('PushPlugin - onNotificationGCM: message: 'e.payload.message+" msgcnt: "+e.payload.msgcnt)

	                    break;

                    case 'error':
                    	console.log("PushPlugin - onNotificationGCM: Error "+e.msg);
                        break;

                    default:
                        console.log("PushPlugin - onNotificationGCM: evento desconocido");
                        break;
                }
            };

			this.registrarApple = function() {

			};
			this.registrarWin = function() {

			};
		}

		return new Notificaciones();  //SINGLETON
	}

);