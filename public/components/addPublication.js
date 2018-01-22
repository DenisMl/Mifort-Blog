import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';

class AddPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="add-publication">
        <form action="/api/addPublication" method="post" className="register-form add-publication-form">
          <input name="title" type="text" className="add-form-input add-publication-title" placeholder="Title" autoFocus
                 required/>
          <textarea name="text" type="text" className="add-publication-text" placeholder="Publication text" required/>
          <input name="tags" type="text" className="add-form-input add-publication-tags" placeholder="Tags"/>

          <button type="submit" className="short-btn button add-form-btn">Add</button>
        </form>
      </div>
    );
  };
}

export default withRouter(AddPublication);