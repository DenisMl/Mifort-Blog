import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Cookies from 'universal-cookie';
import {Route, BrowserRouter as Router, browserHistory, Switch} from 'react-router-dom';

import Header from '../components/header';
import Publications from "../components/publications";
import Login from "../components/login";
import Register from "../components/register";

import {getUserInfo, getPublications, addPublication} from "../components/methods";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.getUserInfo = getUserInfo.bind(this);
    this.getPublications = getPublications.bind(this);
    this.addPublication = addPublication.bind(this);
  };

  componentWillMount() {
    const cookies = new Cookies();
    this.getPublications();
    this.setState({authorized: cookies.get('Authorized')});
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} addPublication={this.addPublication}/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" render={(props) => (
              <Publications authorized={this.state.authorized}
                            getUserInfo={this.getUserInfo}
                            publications={this.state.publications}
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
