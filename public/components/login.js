import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Login extends Component {
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
            <input name="email" type="email" placeholder="email"/>
            <input name="password" type="password" placeholder="password"/>
            <button className="button" type="submit">login</button>
            <p className="message">Not registered? <a href="">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  };
};