import React, {Component} from "react";

export default class Controls extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className="control-wrap">
      <span className="user-loc" onClick={this.props.centerLoc}>
        <i className="fa fa-crosshairs"></i>
      </span>
      <span className="exit-controls">

      </span>
    </div>);
  }
}
