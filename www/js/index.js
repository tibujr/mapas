/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, options) {
    var lastCheckedPosition;
    var locationEventCount = 0;

    options = options || {};


    var checkLocation = function (position) {
        lastCheckedPosition = position;
        ++locationEventCount;
        
        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 0)) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        } else {
            console.log("en progreso: "+ position)

        }
    }


    var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    }


    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
    }


    var foundPosition = function (position) {
        geolocationSuccess(position);
    }


    if (!options.maxWait) options.maxWait = 10000; // Default 10 seconds
    if (!options.desiredAccuracy) options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout) options.timeout = options.maxWait; // Default to maxWait


    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)


    var watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    var timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //llamar location
        //navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError,{enableHighAccuracy:true});
        navigator.geolocation.getAccurateCurrentPosition(app.onSuccess, app.onError, { desiredAccuracy: 50, maxWait: 60000 });
    },

    onSuccess: function(position) {

        /*var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        var latLong = new google.maps.LatLng(latitude, longitude);

        var mapOptions = {
            center: latLong,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);*/

        /*var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
                            'Longitude: ' + position.coords.longitude     + '<br />' +
                            '<hr />'      + element.innerHTML;*/

        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';

        app.initMap(position.coords.latitude, position.coords.longitude);
    },

    onSuccessA: function(position) {

        var puntos = document.getElementById('puntos');
        //puntos.innerHTML = cont+ ' OK <br />';
        a = a + 'x: '           + position.coords.latitude              + '<br />' +
                            'y: '          + position.coords.longitude             + '<br /> <br />' ;
        puntos.innerHTML = a

    },

    onError: function(error) {
        alert('code: '+ error.code  + '\n' + 'message: ' + error.message + '\n');
    },

    onErrorA: function(error) {
        var puntos = document.getElementById('puntos');
        a = a + cont + ' NO LOCALIZADO <br /> <br />';
        puntos.innerHTML = a;
    },

    initMap: function(lat, long){
        var options = {
            zoom: 16,
            center: new google.maps.LatLng(lat, long),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };  

        var map = new google.maps.Map(document.getElementById('map'), options);
    
        var markerPoint = new google.maps.LatLng(lat, long);

        var marker = new google.maps.Marker({

            position: markerPoint,
            map: map,
            title: 'Device\'s Location'

        });
   }

};

var a = "";

var cont = 0;
function contador(){
    cont++;
    navigator.geolocation.getAccurateCurrentPosition(app.onSuccessA, app.onErrorA, { desiredAccuracy: 50, maxWait: 15000 });
    /*var contador = document.getElementById("contador");
    contador.value = cont;*/
    
}
