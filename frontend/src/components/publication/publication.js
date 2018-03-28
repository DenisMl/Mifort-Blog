import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import './style.scss';

class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deletePublication = this.deletePublication.bind(this);
  };

  deletePublication(e) {
    e.preventDefault();
    let self = this;
    let body = JSON.stringify({publicationId: this.props.publication._id});
    fetch('/api/deletePublication', {
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
    }).catch(function (err) {
      console.error(err);
    });
  }

  render() {
    let deleteBtn;
    let date = new Date(this.props.publication.created);
    const url = `/publication?id=${this.props.publication._id}`;
    if (this.props.currentUserId === this.props.publication.author) {
      deleteBtn = (<button onClick={this.deletePublication} className="short-btn button">&#10006;</button>)
    }

    return (
      <Link to={url} className="publication-link">
        <div className="publication-header">
          <div className="publication-name">
            {this.props.publication.publicationName}
          </div>
          <div className="publication-date">
            {date.getHours() + ':' + date.getMinutes() + '  ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}
          </div>
          <div className="publication-author">
            {this.props.author}
          </div>
          <div className="publication-delete-btn">
            {deleteBtn}
          </div>
        </div>
        <div className="publication-text">
          {this.props.publication.publicationText}
        </div>
      </Link>
    );
  };
}

export default withRouter(Publication);