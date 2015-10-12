import React, {Component} from "react";
import cls from "classnames";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let homeCls = cls("homepage", { hide: !this.props.show });
    return (<div className={homeCls}>
      <img src="logo.png">
      <button className="large-button" onClick={this.props.useLocation}>
        <i className="fa fa-location-arrow fa-3"></i>
        <p className="button-name">Use Current Location</p>
      </button>
      <p>OR</p>
      <form className="search-form">
        <input type="search" placeholder="Enter Interests" />
        <button type="submit">
          <i className="fa fa-search fa-3"></i>
        </button>
      </form>
    </div>);
  }
}
