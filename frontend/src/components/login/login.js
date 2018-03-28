import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';

import './style.scss'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  componentDidMount() {
    // this.props.history.push('/login')

  }

  render() {
    // const props = this.props.location.state.product;

    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" method="post" action="/login">
            <input name="email" type="email" placeholder="email" autoComplete="email" required/>
            <input name="password" type="password" placeholder="password" autoComplete="password" required/>
            <button className="button" type="submit">login</button>
            <p className="message">Not registered? <Link to='/register'>Create an account</Link></p>
          </form>
        </div>
      </div>
    );
  };
};

export default withRouter(Login);