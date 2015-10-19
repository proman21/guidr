import React, {Component} from "react";
import cls from "classnames";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interestInput: ""
    }
  }

  changeInterests(event) {
    this.setState({ interestInput: event.target.value });
  }

  render() {
    let homeCls = cls("homepage", { hide: !this.props.show });
    return (<div className={homeCls}>
      <h1>GUIDR</h1>
      <button className="large-button" onClick={this.props.useLocation}>
        <i className="fa fa-location-arrow fa-3"></i>
        <p className="button-name">Use Current Location</p>
      </button>
      <p>OR</p>
      <form className="search-form">
        <input type="search"
        placeholder="Enter Interests e.g. brewing, historic"
        value={this.state.interestInput}
        onChange={this.changeInterests.bind(this)} />
        <button type="submit" onClick={this.props.useInterests(this.state.interestInput)}>
          <i className="fa fa-search fa-3"></i>
        </button>
      </form>
    </div>);
  }
}
