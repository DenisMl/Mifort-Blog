import React, {Component} from 'react';
import {Route, Link, BrowserRouter as Router, browserHistory, withRouter, Switch} from 'react-router-dom';
import Publication from "./publication";


class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderPublications = this.renderPublications.bind(this);
  };

  componentDidMount() {
    if (this.props.authorized == 'false') {
      console.log(`login`);
      this.props.history.push('/login');
    } else {
      this.props.getUserInfo();
    }
  }

  renderPublications() {
    console.log(`this.props.publications`);
    console.log(this.props.publications);
    if (this.props.publications) {
      return this.props.publications.map((pub, i) => {
        return (
          <Publication publication={pub} key={i}/>
        )
      })
    }
  }

  render() {
    return (
      <div className="publications-wrapper">
        {this.renderPublications()}
      </div>
    );
  };
};

export default withRouter(Publications);