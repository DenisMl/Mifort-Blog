import React, {Component} from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import RichTextEditor from 'react-rte';

import './style.scss'

class AddPublication extends Component {
  constructor(props) {
    super(props);
    this.state = {value: RichTextEditor.createEmptyValue()};

    this.addPublication = this.addPublication.bind(this);
    this.onChange = this.onChange.bind(this);
  };

  onChange(value) {
    this.setState({value});
  };

  addPublication(e) {
    e.preventDefault();
    let self = this;
    let pubText = this.state.value.toString('html');
    console.log(`pubText`);
    console.log(pubText);
    let tags = this.pubTags.value.trim().split(/,?\s+/);
    let body = JSON.stringify({
      publicationName: this.pubTitle.value,
      publicationText: pubText,
      tags: tags
    });
    fetch('/api/addPublication', {
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
      self.props.history.push('/');

    }).catch(function (err) {
      console.error(err);
    });
  }

  render() {
    return (
      <div className="add-publication">
        <form onSubmit={this.addPublication} className="register-form add-publication-form">
          <input name="title" type="text" ref={(input) => {
            this.pubTitle = input;
          }} className="add-form-input add-publication-title" maxLength="40" placeholder="Title" autoComplete="off"
                 autoFocus
                 required/>
          <RichTextEditor
            value={this.state.value}
            onChange={this.onChange}
          />
          <input name="tags" type="text" ref={(input) => {
            this.pubTags = input;
          }} className="add-form-input add-publication-tags" autoComplete="off" placeholder="Tags"/>

          <button type="submit" className="short-btn button add-form-btn">Add</button>
        </form>
      </div>
    );
  };
}

export default withRouter(AddPublication);