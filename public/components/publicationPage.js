import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import queryString from 'query-string';

class PublicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {publicationId: queryString.parse(location.search).id}

    this.getPublication = this.props.getPublication.bind(this);
  };

  componentWillMount() {
    this.getPublication(this.state.publicationId);

  }

  render() {
    // console.log(`publicationId: ${this.state.publicationId}`);
    if (this.state.publication) {
      return (
        <div className="publication-page">
          <h1>{this.state.publication.publicationName}</h1>
          <p>{this.state.publication.publicationText}</p>
        </div>
      );
    } else {
      return (
        <div className="publication-page">
          <h1>LOADING...</h1>
        </div>
      )
    }
  };
}

export default withRouter(PublicationPage);