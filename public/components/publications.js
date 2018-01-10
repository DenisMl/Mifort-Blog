import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Publications extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
  };

  componentDidMount() {
    this.props.history.push('/login')

  }
  render() {
    // const props = this.props.location.state.product;

    return (
      <div>
        Publications
      </div>
    );
  };
};