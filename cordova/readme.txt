Para compilar localmente usando Apache Cordova - branch phonegap (no incluye archivos para dev y agrega carpeta res)

El building se hace copiando los mismos archivos del branch phonegap a otra carpeta con la instalación local de cordova (iaca-cordova):

* Archivos web :
    Copiar /iaca-www/index.html -> ../iaca-cordova/
    Copiar carpetas de /iaca-www [menos /res y /cordova] -> ../iaca-cordova/www/

* Carpeta de recursos para compilación de app (iconos y splash):
    Copiar /iaca-www/res/ -> ../iaca-cordova/res/

* config.xml: Archivo de configuración para compilar en Android, usando apache cordova localmente (en lugar de compilar en PhoneGap Build)
    Copiar /iaca-www/cordova/config.xml -> ../iaca-cordova/
