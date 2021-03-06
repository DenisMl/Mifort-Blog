import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';

class AddPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.addPublication = this.addPublication.bind(this);
  };


  addPublication(e) {
    e.preventDefault();
    console.log(e);
    let self = this;
    let body = JSON.stringify({
      publicationName: this.pubTitle.value,
      publicationText: this.pubText.value,
      tags: this.pubTags.value
    });
    fetch('/api/addPublication', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: body,
      credentials: 'include'
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      self.props.setAppState(res);
      self.props.history.push('/');

    }).catch(function (err) {
      console.error(`>>err: ${err}`);
    });
  }

  render() {
    return (
      <div className="add-publication">
        <form onSubmit={this.addPublication} className="register-form add-publication-form">
          <input name="title" type="text" ref={(input) => {
            this.pubTitle = input;
          }} className="add-form-input add-publication-title" maxLength="40" placeholder="Title" autoComplete="off" autoFocus
                 required/>
          <textarea name="text" type="text" ref={(input) => {
            this.pubText = input;
          }} className="add-publication-text" placeholder="Publication text" required/>
          <input name="tags" type="text" ref={(input) => {
            this.pubTags = input;
          }} className="add-form-input add-publication-tags" autoComplete="off" placeholder="Tags"/>

          <button type="submit" className="short-btn button add-form-btn">Add</button>
        </form>
      </div>
    );
  };
}

export default withRouter(AddPublication);