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
    let stateClasses = clsSet({
      "open": this.state.open,
      "close": !this.state.open
    });
    return (<div ref="info" className="info-win-wrap" className={stateClasses}>
      <span className="top-bar">
        <span className="left-arrow" className="button">
          <i className="fa fa-3x fa-caret-left"></i>
        </span>
        <ReactGestures
          onTap={this.toggleWindow.bind(this)}
          onSwipeUp={this.openWindow.bind(this)}
          onSwipeDown={this.closeWindow.bind(this)}>
          <span id="title-wrap"><h1>Title</h1></span>
        </ReactGestures>
        <span className="right-arrow" className="button">
          <i className="fa fa-3x fa-caret-right"></i>
        </span>
      </span>
    </div>);
  }
}
