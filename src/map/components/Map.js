import React, {Component, addons as ReactUtils} from "react";
import {GoogleMap, Marker, DirectionsRenderer, InfoWindow} from "react-google-maps";
import Controls from "./Controls";
import InfoSlider from "./InfoSlider";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
        marker: null,
        directions: null,
        currPlaceIndex: 0,
        places: [{
          name: "Brisbane City Hall",
          info: "Stuff",
          showTitle: false,
          geometry: {
            location: { lat: -27.468124, lng: 153.023801 }
          },
          images: [
            {url: "https://www.museumofbrisbane.com.au/wp-content/uploads/2014/06/CSP_9666-1024x678.jpg"},
            {url: "https://upload.wikimedia.org/wikipedia/commons/5/56/Brisbane_City_Hall_evening_lights.JPG"},
            {url: "http://www.epicure.com.au/images/default-source/Rotator/Venue/bch-big-desktop/bch-3-big-desktop.jpg?sfvrsn=2&size=2600"},
            {url: "http://www.weekendnotes.com/im/009/09/brisbane-city-hall41.JPG"},
            {url: "http://www.epicure.com.au/images/default-source/Rotator/Venue/bch-big-desktop/bch-4-big-desktop.jpg?sfvrsn=2&size=2600"}
          ]
        }],
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
    this.setState(ReactUtils.update(this.state, {
      places: { [index]: { showTitle: { $set: false } } }
    }));
  }

  centerOnUser() {
    this.forceUpdate();
  }

  render() {
    let overlay;

    if(!this.props.background) {
      overlay = ReactUtils.createFragment({
        controls: <Controls centerLoc={this.centerOnUser.bind(this)}/>,
        info_slider: <InfoSlider place={this.state.places[this.state.currPlaceIndex]}/>
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
                onClick={this.showMarkerName().bind(this, i)}>
                  {place.showTitle ? <InfoWindow key={`info_win_$(i)`}>
                    <strong>{place.name}</strong>
                  </InfoWindow> : null}
                </Marker>);
      }
    });
    let mapOptions = { zoomControl: true,
                   scaleControl: false,
                   streetViewControl: true,
                   streetViewControlOptions:{
                     position:google.maps.ControlPosition.LEFT_TOP  
                   },
                   zoomControlOptions:{
                     position:google.maps.ControlPosition.LEFT_TOP,
                     style:google.maps.ZoomControlStyle.LARGE                 
                   },
                   mapTypeControlOptions: {
                     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                     position: google.maps.ControlPosition.TOP_RIGHT
                   }                 
        };
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
        options={mapOptions}>
        {this.state.directions ? <DirectionsRenderer
                                  directions={this.state.directions}
                                  options={{suppressMarkers: true}} /> : null}
        // {this.state.place ? <Marker {...this.state.marker} /> : null}
        <Marker position={this.props.userLoc} key="user"
        icon="http://i.stack.imgur.com/orZ4x.png" />
        {placeMarkers}
      </GoogleMap>
    </div>);
  }
}
