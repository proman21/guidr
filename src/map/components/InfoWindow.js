import React, {Component, addons} from "react/addons";
import ReactGestures from "react-gestures";
import clsSet from "classnames";
let ReactCSSTransitionGroup = addons.CSSTransitionGroup;

export default class InfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleWindow(e) {
    if(this.state.open) {
      this.closeWindow(e);
    } else {
      this.openWindow(e);
    }
  }

  openWindow(e) {
    this.setState({
      open: true
    });
  }

  closeWindow(e) {
    this.setState({
      open: false
    });
  }

  render() {
    let stateClasses = clsSet("info-win-wrap", {
      "open": this.state.open,
      "close": !this.state.open
    });
    return (<div ref="info" className={stateClasses}>
      <span className="top-bar">
        <span className="left-arrow" className="button">
          <i className="fa fa-3x fa-caret-left"></i>
        </span>
        <ReactGestures
          onTap={this.toggleWindow.bind(this)}
          onSwipeUp={this.openWindow.bind(this)}
          onSwipeDown={this.closeWindow.bind(this)}>
          <h1 className="title-wrap">Title</h1>
        </ReactGestures>
        <span className="right-arrow" className="button">
          <i className="fa fa-3x fa-caret-right"></i>
        </span>
      </span>
    </div>);
  }
}
