import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';

import './style.scss'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  render() {
    // const props = this.props.location.state.props;

    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form" method="post" action="/register">
            <input name="email" type="email" placeholder="Email address" autoComplete="email" required/>
            <input name="nickname" type="text" placeholder="Your nickname" required/>
            <input name="password" type="password" placeholder="Password" autoComplete="password" required/>
            <button className="button" type="submit">create</button>
            <p className="message">Already registered? <Link to='/login'>Sign In</Link></p>
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter(Register);