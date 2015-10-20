import React, {Component, addons as ReactUtils} from "react/addons";
import Slider from "react-slick";
import ReactGestures from "react-gestures";
import clsSet from "classnames";
let ReactCSSTransitionGroup = ReactUtils.CSSTransitionGroup;

export default class InfoSlider extends Component {
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

    let sliderSettings = {
      className: "image-gallery",
      dots: true,
      infinite: true,
      arrows: true,
      infinite: true
    };
    return (<div ref="info" className={stateClasses}>
      <span className="top-bar">
        <span className="left-arrow" className="button">
          <i className="fa fa-3x fa-caret-left"></i>
        </span>
        <ReactGestures
          onTap={this.toggleWindow.bind(this)}
          onSwipeUp={this.openWindow.bind(this)}
          onSwipeDown={this.closeWindow.bind(this)}>
          <div className="title-wrap" onClick={this.toggleWindow.bind(this)}>
            <p>{this.props.place.name}</p>
          </div>
        </ReactGestures>
        <span className="right-arrow" className="button">
          <i className="fa fa-3x fa-caret-right"></i>
        </span>
      </span>
      <span className="image-gallery-wrap">
        <Slider {...sliderSettings}>
          {this.props.place.images.map(image => {
            return <img src={image.url} key={image.url}></img>
          })}
        </Slider>
      </span>
      <span>
        {this.props.place.info}
      </span>
    </div>);
  }
}
