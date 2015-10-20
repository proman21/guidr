import fetch from 'fetch-jsonp';
import URIT from 'uri-templates';

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
const TROVE_ZONE = "newspaper";

/**
 * The API key for searching trove
 * @type {string}
 */
const TROVE_KEY = "miqepgv07q9ktath";

const TROVE_URI = new URIT("http://api.trove.nla.gov.au/result{?params*}");

const WIKI_URI = new URIT("https://en.wikipedia.org/w/api.php{?params*}");
/**
 * The number of results to be returned from a trove search
 * @type {number}
 */
const NUM_RESULTS = 20;

/**
 * Returns an array of Place objects that trove and the places API both have info on
 * @param mapObject The Map object that is being used to work with the Places  API
 * @param latitude
 * @param longitude
 * @param interests An array of strings representing the interests for the places
 * @param radius The radius in which to search
 */
export function getPlaces(mapObject, latitude, longitude, interests, radius) {
    let location = new google.maps.LatLng(latitude, longitude);
    let request = {
        location: location,
        radius: radius,
        types: interests
    };

    let service = new google.maps.places.PlacesService(mapObject);
    service.nearbySearch(request, placesSearchCallback);
}

/**
 * The callback for the places API search
 * @param results
 * @param status
 */
export function placesSearchCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            let res = results[i];
            if (res.opening_hours.open_now)
                checkTrove(results[i]);
        }
    }
}


/**
 * Checks if trove has the place given, and adds it to the list if it contains data
 * @param place
 */
export function checkTrove(place) {
    let params = {
      "key": TROVE_KEY,
      "zone": TROVE_ZONE,
      "q": encodeURI(place.vicinity),
      "n": NUM_RESULTS,
      "encoding": "json"
    };

  let wikiParams = {
    "action": "query",
    "titles": encodeURI(place.vicinity),
    "format": "json",
    "prop": "revisions",
    "rvprop": "content"
  }

    fetch(TROVE_URI.fillFromObject({ params }))
    .then(data => data.json())
    .then(msg => {
      if (msg.zone[0].records.n != 0) { //check if any results were returned
        fetch(WIKI_URI.fillFromObject({ wikiParams }))
        .then(wikiData => wikiData.json())
        .then(wikiMsg => {
          var wikiPage;
          if(!wikiMsg["query"]["pages"][0].hasOwnProperty("missing")) {
            wikiPage = "https://en.wikipedia.org/wiki/"+encodeURI(place.vicinity);
          } else {
            wikiPage = "";
          }

          trovePlaces.push({
            "troveData":msg,
            "placesData": place,
            "wikiPage": wikiPage
          });
        });
      } else {

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
export function createMarker(map, latitude, longitude, title, article) {

}

/**
 * For development purposes, logs the error from a location call
 * @param error
 */
export function logLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location unavailable");
            break;
        case error.TIMEOUT:
            console.log("Location timed out");
            break;
        default:
            console.log("Unknown error");
            break;
    }
}
