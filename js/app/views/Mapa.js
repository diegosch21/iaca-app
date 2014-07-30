define([
	'jquery',
    'underscore',
    'backbone',
    'lib/gmaps'
], function ($,_,Backbone) {

	var MapaView = Backbone.View.extend({
		
        initialize: function() {
            var map;
        },

        mapOptions:  {
            zoom: 13,
            center: new google.maps.LatLng(-38.717607, -62.265389), //Bahia Blanca
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },

        render: function(el){
            map = new google.maps.Map(el,this.mapOptions);
            this.map = map;
        },
        setMarkers: function(markers) {
            var infowindow = new google.maps.InfoWindow({maxWidth: 160});
            var marker, i;
            for (i = 0; i < markers.length; i++) {  
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markers[i]["lat"], markers[i]["lng"]),
                    title: "Sede "+markers[i]["sede"],
                    icon: markers[i]["icon"],
                    map: this.map
                });
                
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        var content = "<strong>Sede "+markers[i]["sede"]+"</strong><br/>";
                        content+= markers[i]["info"]+"<br/>";
                        content+= "<i>"+markers[i]["direccion"]+"</i>"
                        infowindow.setContent(content);
                        infowindow.open(this.map, marker);
                    }
                })(marker, i));
            }
        },
        setCenter: function(lat,lng) {
            this.mapOptions.center = new google.maps.LatLng(lat,lng);
        },
        setZoom: function(z) {
            this.mapOptions.zoom = z;
        }
        
        
        
	});
	return MapaView;

});