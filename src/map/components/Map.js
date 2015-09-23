import React, {Component} from "react";
import {GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import Controls from "./Controls";
import InfoWindow from "./InfoWindow";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marker: null,
        directions: null,
        user: {lat: -27.499622, lng: 153.014579},
        place: null
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

  componentDidMount() {
      if (!this.props.background && this.props.useLocation) {
        geolocation.watchPosition(position => {
          let userLoc = new google.maps.LatLng(position.coords.latitude,
                                               position.coords.longitude);
          console.log(userLoc);
          this.setState({ user: userLoc });
          this.state.place ? this.showDirections() : null;
        }, reason => console.error(`Geolocation service failed: ${reason}`));
    } else if(!this.props.useLocation) {
      this.setState({ user: this.props.location });
    }
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
        defaultCenter={this.state.user}
        defaultZoom={15}>
        // {this.state.directions ? <DirectionsRenderer directions={this.state.directions} /> : null}
        // {this.state.place ? <Marker {...this.state.marker} /> : null}
        <Marker position={this.state.user}/>
      </GoogleMap>
    </div>);
  }
}