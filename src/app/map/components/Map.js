import React, {Component} from "react";
import {GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import Controls from "./Controls";
import InfoWindow from "./InfoWindow";

const geolocation = (
    "undefined" !== typeof window && navigator && navigator.geolocation || {
        getCurrentPosition: (success, failure) => {
            failure("Your browser does not support geolocation.");
        },
    }
);

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marker: null,
        directions: null,
        user: null,
        place: null,
    };
  }

  render() {
    let overlay;

    if(!this.props.background) {
      overlay = (<div className="overlay">
                  <Controls />
                  <InfoWindow />
                </div>);
    }
    return (<div className="map-wrap">
      {overlay}
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        ref="map"
        defaultCenter={{lat: -27.4684182, lng: 153.0241399}}
        defaultZoom={15}
        zoomControl={false}
        scaleControl={false}
        streetViewControl={false}>
        {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}
        {this.state.place ? <Marker {...this.state.marker} /> : null}
      </GoogleMap>
    </div>);
  }

  createMarker() {
      var details = {
          position: this.state.place.geometry.location,
          key: this.state.place.name
      }
      this.setState({ marker: details });
  }

  setPlace(place) {
      this.setState({ place: place });
  }

  showDirections() {
      const directionsService = new google.maps.DirectionService();
      request = {
          origin: this.state.user,
          destination: this.state.place.geometry.location,
          travelMode: google.maps.TravelMode.WALKING
      };
      directionsService.route(request, (result, status) => {
          if (status == google.maps.DirectionsStatus.OK) {
              this.setState({ directions: result });
          }
      });
  }

  componentDidMount() {
      if (!this.props.background) {
        let geo = new Promise((resolve, reject) => {
          geolocation.getCurrentPosition(resolve, reject);
        }).then(position => {
          let userLoc = new google.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude
                  );
          this.setState({ user: userLoc });
          this.state.place ? this.showDirections() : null;
        }).catch(reason => console.error("Geolocation service failed"));
      }
  }
}
