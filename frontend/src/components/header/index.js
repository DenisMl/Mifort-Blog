import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import './style.css';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.modalCloseOutside = this.modalCloseOutside.bind(this);
    this.createAndClose = this.createAndClose.bind(this);

  };

  modalOpen() {
    this.refs.modal.style.display = "block";
    this.pubNameInput.value = '';
    this.pubNameInput.focus();
  }

  modalClose() {
    this.refs.modal.style.display = "none";
  }

  modalCloseOutside(event) {
    if (event.target == this.refs.modal) {
      this.refs.modal.style.display = "none";
    }
  }

  createAndClose() {
    this.props.addPublication(this.pubNameInput.value);
    this.modalClose();
  }


  render() {
    // const props = this.props.location.state.product;
    const user = this.props.user || {};
    const nickname = user.nickname || '';

    if (this.props.user) {
      return (
        <div className="header">
          <div className="header-content">
            <span><h3>{this.props.user.nickname}</h3></span>
            <div className="header-buttons">
              <Link to="/addPublication" className="short-btn button">Add publication</Link>

              <form action="/logout" method="post" className="logout-form">
                <button type="submit" className="short-btn button">Logout</button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="header-content">
            <span><h3>{nickname}</h3></span>
            <div className="header-buttons">
              <form action="/logout" method="post" className="logout-form">
                <button type="submit" className="short-btn button">Logout</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

  };
};