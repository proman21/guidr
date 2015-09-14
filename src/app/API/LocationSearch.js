

function getLocationFromSearch(){

}

function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, showError);
    } else {
        console.log("Location not supported");
    }
}


var map;
var service;
var infowindow;

function initialize() {
    getCurrentLocation(function(location) {
        var pyrmont = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

        map = new google.maps.Map(document.getElementById('map'), {
            center: pyrmont,
            zoom: 15
        });

        var request = {
            location: pyrmont,
            radius: '500',
            types: ['store']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, initializeCallback);
    });

}
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location unavailable.");
            break;
        case error.TIMEOUT:
            console.log("Location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("Unknown error.");
            break;
    }
}
function initializeCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
        }
    }
}

function getNearbyLocations(){
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}