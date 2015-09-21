

/**
 * The list of places that are currently being worked with
 * @type {Array}
 * @format {troveData, placesData}
 */
var trovePlaces = [];
/**
 * The zone to search trove for information
 * @type {string}
 */
var troveZone = "newspaper";

/**
 * The API key for searching trove
 * @type {string}
 */
var troveKey = "miqepgv07q9ktath";

/**
 * Attempts to get the users location
 * @param callback The function to run on success
 */
function getCurrentLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback, logLocationError);
    } else {
        console.log("Location not supported");
    }
}

/**
 * Returns an array of Place objects that trove and the places API both have info on
 * @param mapObject The Map object that is being used to work with the Places  API
 * @param latitude
 * @param longitude
 * @param interests An array of strings representing the interests for the places
 * @param radius The radius in which to search
 */
function getPlaces(mapObject, latitude, longitude, interests, radius) {
    var location = new google.maps.LatLng(latitude, longitude);
    var request = {
        location: location,
        radius: radius,
        types: interests
    };

    var service = new google.maps.places.PlacesService(mapObject);
    service.nearbySearch(request, placesSearchCallback);

}

/**
 * The callback for the places API search
 * @param results
 * @param status
 */
function placesSearchCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var res = results[i];
            if (res.opening_hours.open_now)
                checkTrove(results[i]);
        }
    }
}


/**
 * Checks if trove has the place given, and adds it to the list if it contains data
 * @param place
 */
function checkTrove(place) {
    var data = {"key":troveKey,"zone":troveZone,"q":encodeURI(place.vicinity), "n":numberOfResults, "encoding":"JSON"};
    $.ajax({
        url: "http://api.trove.nla.gov.au/result",
        dataType: JSON,
        type:"GET",
        data:data,
        success: function (msg) {
            if (msg['zone'][0]['records']['n'] != 0) //check if any results were returned
                trovePlaces.push({"troveData":msg, "placesData": place});
        }
    });
}

/**
 * Adds a marker to the map
 * @param map The map to work with
 * @param latitude
 * @param longitude
 * @param title The title that is displayed when the marker is clicked
 * @param article The information object for the location
 */
function createMarker(map, latitude, longitude, title, article) {

}

/**
 * For development purposes, logs the error from a location call
 * @param error
 */
function logLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location unavailable.");
            break;
        case error.TIMEOUT:
            console.log("Location timed out.");
            break;
        default:
            console.log("Unknown error.");
            break;
    }
}