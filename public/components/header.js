import React, { Component } from 'react';
import {Link} from 'react-router-dom'

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
    this.refs.projectName.value = '';
    this.refs.projectName.focus();
  }

  // When the user clicks on <span> (x), close the modal
  modalClose() {
    this.refs.modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  modalCloseOutside(event) {
    if (event.target == this.refs.modal) {
      this.refs.modal.style.display = "none";
    }
  }

  createAndClose(event) {
    this.createProject();
    this.modalClose();
  }

  render() {
    // const props = this.props.location.state.product;
    const user = this.props.user || {};
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';

    if (this.props.user) {
      return (
        <div className="header">
          <span><h3>{this.props.user.firstName}&ensp;{this.props.user.lastName}</h3></span>

          <div className="header-buttons">

            {/* <!-- Trigger/Open The Modal --> */}
            <button ref="btn" onClick={this.modalOpen} className="short-btn button">Add publication</button>

            {/* <!-- The Modal --> */}
            <div ref="modal" onClick={this.modalCloseOutside} className="modal">

              {/* <!-- Modal content --> */}
              <div className="modal-content form">
                <div className="modal-header">
                  <h4>Add new publication</h4>
                </div>
                <div className="modal-body">
                  <input className="modal-input" ref="projectName" type="text" placeholder="Publication title" autoFocus/>
                  <button className="button modal-button" onClick={this.createAndClose}>Add</button>
                </div>
              </div>

            </div>

            <form action="/logout" method="post" className="logout-form">
              <button type="submit" className="short-btn button">Logout</button>
            </form>
          </div>
        </div>
      );
    } else {
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
    }

  };
};