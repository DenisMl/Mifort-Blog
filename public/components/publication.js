import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';

class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const url = `/publication?id=${this.props.publication._id}`;
    return (
      <div className="publication">
        <Link to={url}>{this.props.publication.publicationName}</Link>
      </div>
    );
  };
}

export default withRouter(Publication);