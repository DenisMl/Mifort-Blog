import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';

class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  componentDidMount() {
    // console.log(`auth`);
    // console.log(this.props.authorized == 'false');
    if (this.props.authorized == 'false') {
      console.log(`login`);
      this.props.history.push('/login');
    }

  }
  render() {
    // const props =
    //  console.log(this.props.location.state);

    return (
      <div>
        Publications
      </div>
    );
  };
};

export default withRouter(Publications);