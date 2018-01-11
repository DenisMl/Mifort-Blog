import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  render() {
    // const props = this.props.location.state.product;
    const user = this.props.user || {};
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (

      <div className="header">
        <span><h3>{firstName}&ensp;{lastName}</h3></span>
        <div className="header-buttons">
          <form action="/logout" method="post" className="logout-form">
            <button type="submit" className="short-btn button">Logout</button>
          </form>
        </div>
      </div>
    );
  };
};