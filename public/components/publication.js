import React, { Component } from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';

class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="publication">
        <span>{this.props.publication.publicationName}</span>
      </div>
    );
  };
}

export default withRouter(Publication);