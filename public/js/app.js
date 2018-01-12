import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Cookies from 'universal-cookie';
import {Route, BrowserRouter as Router, browserHistory, Switch} from 'react-router-dom';

import Header from '../components/header';
import Publications from "../components/publications";
import Login from "../components/login";
import Register from "../components/register";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.getUserInfo = this.getUserInfo.bind(this);
  };

  // getUserInfo() {
  //   let self = this;
  //   fetch('/app/getUserInfo', {
  //     method: 'get',
  //     dataType: 'json',
  //     credentials: 'include'
  //   }).then(function (res) {
  //     return res.json();
  //   }).then(function (res) {
  //     self.setState({user: res});
  //   }).then(function (res) {
  //     self.getProjectsInfo();
  //   }).catch(function (err) {
  //     console.log(`>>err: ${err}`);
  //   });
  // }
  //
  // getProjectsInfo() {
  //   let self = this;
  //   let body = JSON.stringify({isManager: this.state.user.isManager});
  //   fetch('/app/getProjectsInfo', {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     method: 'POST',
  //     body: body,
  //     credentials: 'include'
  //   }).then(function (res) {
  //     return res.json();
  //   }).then(function (res) {
  //     self.setState({projects: res});
  //   }).catch(function (err) {
  //     console.log(`>>err: ${err}`);
  //   });
  // }
  //
  //

  getUserInfo() {
    let self = this;
    fetch('/app/getUserInfo', {
      method: 'get',
      dataType: 'json',
      credentials: 'include'
    }).then(function (res) {
      return res.json();
    }).then(function (res) {
      console.log(`getUserInfo res: ${res}`);
      self.setState({user: res});
    }).catch(function (err) {
      console.log(`>>err: ${err}`);
    });
  }

  componentWillMount() {
    const cookies = new Cookies();
    this.setState({authorized: cookies.get('Authorized')});
  }

  render() {
    return (
      <div>
        <Header user={this.state.user}/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" render={(props) => (
              <Publications authorized={this.state.authorized}
                            getUserInfo={this.getUserInfo}
              /> )}/>
            <Route path="/login" render={(props) => (
              <Login authorized={this.state.authorized}
              /> )}/>
            <Route path="/register" render={(props) => (
              <Register authorized={this.state.authorized}/>
            )}/>
          </Switch>
        </Router>
      </div>
    );
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
