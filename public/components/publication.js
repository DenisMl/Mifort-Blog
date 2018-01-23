import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    const url = `/publication?id=${this.props.publication._id}`;
    return (
      <Link to={url} className="publication-link">{this.props.publication.publicationName}</Link>
    );
  };
}

export default withRouter(Publication);