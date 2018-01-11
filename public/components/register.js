import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  componentDidMount() {
    // this.props.history.push('/login')

  }

  render() {
    // const props = this.props.location.state.props;

    return (
      <div className="login-page">
        <div className="form">
          <form className="register-form" method="post" action="/register">
            <input name="email" type="email" placeholder="Email address" autoComplete="email" required/>
            <input name="firstName" type="text" placeholder="First name" required/>
            <input name="lastName" type="text" placeholder="Last Name"/>
            <input name="password" type="password" placeholder="Password" autoComplete="password" required/>
            <button className="button" type="submit">create</button>
            <p className="message">Already registered? <Link to='/login'>Sign In</Link></p>
          </form>
        </div>
      </div>
    );
  };
};

export default withRouter(Register);