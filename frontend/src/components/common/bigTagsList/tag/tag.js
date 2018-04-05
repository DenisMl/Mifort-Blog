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
      <div className="tag">
        {this.props.tag}
      </div>
    );
  };
}

export default withRouter(Tag);