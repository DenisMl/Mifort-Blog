import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import queryString from 'query-string';
import BigTagsList from "../common/bigTagsList/bigTagsList";

import './style.scss';

class PublicationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {publicationId: queryString.parse(location.search).id}

    this.getPublication = this.props.getPublication.bind(this);
    this.getUsersByIDs = this.props.getUsersByIDs.bind(this);
  };

  componentWillMount() {
    this.getPublication(this.state.publicationId);
  }

  render() {
    if (this.state.publication) {
      let date = new Date(this.state.publication.created);
      let bigTagsList = (this.state.publication.tags[0]) ? <BigTagsList tags={this.state.publication.tags}/> : null;

      return (
        <div className="publication-page">
          <div className="publication-page-wrapper">
            <div className="publication-page-header">
              <div className="publication-page-name">
                {this.state.publication.publicationName}
              </div>
              <div className="publication-page-date">
                {date.getHours() + ':' + date.getMinutes() + '  ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}
              </div>
            </div>
            <div className="publication-page-text">
              {this.state.publication.publicationText}
            </div>
            {bigTagsList}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="publication-page-page">
        </div>
      )
    }
  };
}

export default withRouter(PublicationPage);