import {Component} from "react";
import Homepage from "./homepage/components/Homepage";

export default class GuidrApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<Homepage />);
  }
}
