import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.getUserInfo = this.props.getUserInfo.bind(this);
  };

  componentDidMount() {
    if (this.props.authorized == 'false') {
      console.log(`login`);
      this.props.history.push('/login');
    } else {
      this.props.getUserInfo();
    }

  }
  render() {
    // const props =
    //  console.log(this.props.location.state);

    return (
      <div className="publications-wrapper">
        Publications
      </div>
    );
  };
};

export default withRouter(Publications);