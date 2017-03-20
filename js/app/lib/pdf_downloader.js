/* global device, cordova, FileTransfer */
define([],function() {
	var PDFDownloader = function() {

		this.download = function(pdf_url,pdf_id,callback_exito,callback_error) {
			if (window.deviceready) {
				var platform = device.platform,
					saveDirectory = "";
				if (platform === "iOS") {
					saveDirectory = cordova.file.documentsDirectory;
				}
				else if (platform == 'android' || platform == "Android" ) {
					if (cordova.file.externalRootDirectory) {
						saveDirectory = cordova.file.externalRootDirectory;
					}
					else if (cordova.file.externalApplicationStorageDirectory) {
						saveDirectory = cordova.file.externalApplicationStorageDirectory;
					}
					else {
						saveDirectory = cordova.file.cacheDiretory;
					}
				}
				else {
					saveDirectory = cordova.file.dataDirectory;
				}

				window.resolveLocalFileSystemURL(saveDirectory,
					// success resolveLocalFileSystemURL
					function (dir) {
						dir.getDirectory("IACA",{create: true},
						// success getDirectory
						function(finalDir){
							var fileTransfer = new FileTransfer();
							if (fileTransfer) {
								var uri = encodeURI(pdf_url),
									fileURL = finalDir.toURL() + 'resultado_analisis_'+pdf_id+'.pdf';
								fileTransfer.download(
									uri,
									fileURL,
									function(entry) {
										console.log("download complete: " + entry.toURL());
										// muestra el PDF
										if (platform == 'android' || platform == "Android" ) {
											window.cordova.plugins.FileOpener.openFile(entry.toURL(),
											function() {
												console.log('PDF abierto');
												if (callback_exito) {
													callback_exito();
												}
											},
											function(error) {
												errorDescarga(error,'fileTransfer.download',pdf_url);
											});
										}
										else {
											window.open(entry.toURL(), '_blank', 'location=no,closebuttoncaption=Close,enableViewportScale=yes');
											if (callback_exito) {
												callback_exito();
											}
										}
									},
									function(error) {
										errorDescarga(error,'fileTransfer.download',pdf_url);
									},
									true
								);
							}
							else {
								errorDescarga("",'fileTransfer',pdf_url);
							}
						},
						// error getDirectory
						function(error) {
							errorDescarga(error,'getDirectory',pdf_url);
						});
					},
					// error resolveLocalFileSystemURL
					function(error){
						errorDescarga(error,'resolveLocalFileSystemURL',pdf_url);
					}
				);

				var errorDescarga = function(error,tipo,url) {
					console.log("Error "+ tipo + " "+  error);
					// error: intenta descargar con browser
					window.open(url, '_system');
					if (callback_error) {
						callback_error();
					}
				};
			}
			else {
				window.open(pdf_url, '_blank');
				if (callback_exito) {
					callback_exito();
				}
			}
		};
	};

	return new PDFDownloader();  //SINGLETON
});