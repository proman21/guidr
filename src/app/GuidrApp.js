import React, {Component} from "react";
import Homepage from "./homepage/components/Homepage";
import Map from "./map/components/Map";

export default class GuidrApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: true
    };
  }

  render() {
    return (<div className="navigation">
      <Homepage />
      <Map background={this.state.background}/>
    </div>);
  }
}
