import React from "react";
import Homepage from "./homepage/components/Homepage";
import Map from "./map/components/Map";
import FlashQueue from "./lib/flash-queue";
import API from "./API/LocationSearch";

export default React.createClass({
  mixins: [FlashQueue.Mixin],

  getInitialState: function() {
    return {
      homepage: true,
      userLoc: {lat: -27.4738136, lng: 153.014579}
    };
  },

  useLocation: function() {
    navigator.geolocation.watchPosition(position => {
      this.setState({
        userLoc: new google.maps.LatLng(position.coords.latitude,
                                     position.coords.longitude),
        homepage: false
      });
    }, reason => {
      console.error(`Geolocation service failed: ${reason.message}`);
      this.flash("error", "Couldn't get your location. Did you revoke location permissions?");
    });
  },

  useInterests: function(interests) {
    this.setState({places: [
      
    ]})
  },

  render: function() {
    let Queue = FlashQueue.DOM.queue;

    return (<div className="navigation">
      <Queue messages={this.props.messages}/>
      <Homepage show={this.state.homepage}
      useLocation={this.useLocation} useInterests={this.useInterests}/>
      <Map userLoc={this.state.userLoc} background={this.state.homepage}/>
    </div>);
  }
});