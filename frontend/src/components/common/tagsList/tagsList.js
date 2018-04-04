import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Tag from "../tag/tag";

import './style.scss';

class TagsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  renderTagsList () {
    if (this.props.tags[0]) {
      return this.props.tags.map((tag, i) => {
        return (
          <Tag key={i} tag={tag}/>
        )
      })
    }
  }

  render() {
    return (
      <div className="tags-list">
        {this.renderTagsList()}
      </div>
    );
  };
}

export default withRouter(TagsList);