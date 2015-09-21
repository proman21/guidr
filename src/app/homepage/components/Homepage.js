import React, {Component} from "react";
import Modal from "react-modal";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="homepage">
      <h1>GUIDR</h1>
      <button className="large-button">
        <i className="fa fa-location-arrow fa-3"></i>
        <p className="button-name">Use Current Location</p>
      </button>
      <p>OR</p>
      <button className="large-button">
        <i className="fa fa-search fa-3"></i>
        <p className="button-name">Select an Interest</p>
      </button>
    </div>);
  }
}
