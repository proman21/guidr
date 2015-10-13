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
        place: null,
        currentFocus: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.refs.map.state.map.setOptions({
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
    });
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
    let directionsService = new google.maps.DirectionService();
    request = {
      origin: this.props.userLoc,
      destination: this.state.place.geometry.location,
      travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, (result, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        this.setState({ directions: result });
      }
    });
  }

  render() {
    let overlay;

    if(!this.props.background) {
      overlay = ReactUtils.createFragment({
        controls: <Controls />,
        info_window: <InfoWindow />
      });
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
        center={this.state.currentFocus || this.props.userLoc}
        defaultZoom={15}>
        // {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}
        // {this.state.place ? <Marker {...this.state.marker} /> : null}
        <Marker position={this.props.userLoc} key="user"
        icon="http://i.stack.imgur.com/orZ4x.png" />
      </GoogleMap>
    </div>);
  }
}
