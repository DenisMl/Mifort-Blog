import React, { Component } from 'react';
import ReactDOM from "react-dom";
// import { withCookies, Cookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import {Route, BrowserRouter as Router, browserHistory, Switch} from 'react-router-dom';

import Header from '../components/header';
import Publications from "../components/publications";
import Login from "../components/login";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    // this.toOpenCheckout = this.toOpenCheckout.bind(this);
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


  componentDidMount() {
    const cookies = new Cookies();
    this.setState({authorized: cookies.get('Authorized')});
  }

  render() {
    return (
      <div>
        <Header/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={Publications}/>
            {/*<Route path="/signup" component={SignUp}/>*/}
            {/*<Route exact path="/profile" render={(props) => ( <Profile user={this.props.user}/> )} />*/}
            <Route path="/login" render={(props) => ( <Login authorized={this.state.authorized} /> )} />
          </Switch>
        </Router>
      </div>
    );
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
