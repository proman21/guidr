import React, {Component} from "react";
import {GoogleMap, Marker} from "react-google-maps";
import Controls from "./Controls";
import InfoWindow from "./InfoWindow";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </GoogleMap>
    </div>);
  }
}
