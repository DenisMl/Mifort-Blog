import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './style.scss';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.createAndClose = this.createAndClose.bind(this);

  };

  createAndClose() {
    this.props.addPublication(this.pubNameInput.value);
    this.modalClose();
  }


  render() {
    // const props = this.props.location.state.product;
    const user = this.props.user || {};
    const nickname = user.nickname || '';
    let header = <div/>;

    console.log(`~this.props.user.id`);
    console.log(this.props.user.id);
    if (this.props.user.id) {
      header = (
        <div className="header">
          <div className="header-content">
            <span><h3>{nickname}</h3></span>
            <div className="header-buttons">
              <Link to="/addPublication" className="short-btn button">Add publication</Link>

              <form action="/logout" method="post" className="logout-form">
                <button type="submit" className="short-btn button">Logout</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
    return header;
  };
};