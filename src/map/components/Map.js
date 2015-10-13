import React, {Component, addons as ReactUtils} from "react";
import {GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import Controls from "./Controls";
import InfoWindow from "./InfoWindow";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marker: null,
        directions: null,
        currPlaceIndex: 0,
        places: [{
          geometry: {
            location: { lat: -27.468124, lng: 153.023801 }
          }
        }],
        currentFocus: null,
        mode: "travelling"
    };
  }

  componentDidUpdate(prevProps, prevState) {
    //set directions if applicable
    this.showDirections();
  }

  componentWillUnmount() {
    geolocation.clearWatch();
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
    let directionsService = new google.maps.DirectionsService();
    let request = {
      origin: this.props.userLoc,
      destination: this.state.places[this.state.currPlaceIndex].geometry.location,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        if(result.routes[0].legs[0].distance.value < 100) {
          this.setState({ directions: null, mode: "at-destination" });
        } else {
          this.setState({ directions: result, mode: "travelling" });
        }
      }
    });
  }

  showMarkerName(index) {

  }

  centerOnUser() {
    this.forceUpdate();
  }

  render() {
    let overlay;

    if(!this.props.background) {
      overlay = ReactUtils.createFragment({
        controls: <Controls centerLoc={this.centerOnUser.bind(this)}/>,
        info_window: <InfoWindow />
      });
    }

    //build markers for places, show only 10
    let placeMarkers = this.state.places.slice(0, 10).map((place, i) => {
      if(i == this.state.currPlaceIndex) {
        // render a focussed marker
        return (<Marker position={place.geometry.location} key={i}/>);
      } else {
        // render a normal marker
        return (<Marker position={place.geometry.location} key={i}
                 onClick={this.showMarkerName().bind(this, i)}/>);
      }
    });

    return (<div className="map-wrap">
      {overlay}
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            height: "100%",
          },
        }}
        ref="map"
        center={this.props.userLoc}
        defaultZoom={15}
        options={{ zoomControl: false,
                   scaleControl: false,
                   streetViewControl: false,
                   mapTypeControlOptions: {
                     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                     position: google.maps.ControlPosition.TOP_RIGHT
                   }
        }}>
        {this.state.directions ? <DirectionsRenderer directions={this.state.directions} options={{suppressMarkers: true}} /> : null}
        // {this.state.place ? <Marker {...this.state.marker} /> : null}
        <Marker position={this.props.userLoc} key="user"
        icon="http://i.stack.imgur.com/orZ4x.png" />
        {placeMarkers}
      </GoogleMap>
    </div>);
  }
}
