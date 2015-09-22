import React, {Component} from "react";
import Homepage from "./homepage/components/Homepage";
import Map from "./map/components/Map";

export default class GuidrApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homepage: true,
      useLocation: false
    };
  }

  useLocation() {
    this.setState({
      homepage: false,
      useLocation: true
    });
  }

  render() {
    return (<div className="navigation">
      <Homepage show={this.state.homepage} useLocation={this.useLocation.bind(this)}/>
      <Map useLocation={this.state.useLocation} background={this.state.homepage}/>
    </div>);
  }
}
