import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './style.scss';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <span className="tag" onClick={(e) => {this.props.filterPublications(e, this.props.tag)}}>
        {this.props.tag}
      </span>
    );
  };
}

export default withRouter(Tag);