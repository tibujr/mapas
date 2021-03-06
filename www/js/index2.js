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
        //navigator.geolocation.getAccurateCurrentPosition(app.onSuccess, app.onError,{desiredAccuracy:20, maxWait:15000);
            navigator.geolocation.getAccurateCurrentPosition(app.onSuccess, app.onError,{timeout: 5000, enableAccuracy: false, maximumAge: 0});
        //navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError,{timeout: 5000, enableAccuracy: false, maximumAge: 0});
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

    onError: function(error) {
        alert('code: '+ error.code  + '\n' + 'message: ' + error.message + '\n');
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
