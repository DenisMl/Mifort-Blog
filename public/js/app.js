import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Cookies from 'universal-cookie';
import {Route, BrowserRouter as Router, browserHistory, Switch} from 'react-router-dom';

import Header from '../components/header';
import Publications from "../components/publications";
import PublicationPage from "../components/publicationPage";
import Login from "../components/login";
import Register from "../components/register";

import {getUserInfo, getPublications, addPublication, getPublication} from "../components/methods";

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
    let authorized = cookies.get('Authorized');
    if (authorized) {
      this.getPublications();
      this.getUserInfo();
    }
    this.setState({authorized: cookies.get('Authorized')});
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} addPublication={this.addPublication}/>
        <div className="main-wrapper">
          <Router history={browserHistory}>
            <Switch>
              <Route exact path="/" render={(props) => (
                <Publications authorized={this.state.authorized}
                              getUserInfo={this.getUserInfo}
                              publications={this.state.publications}
                /> )}/>
              <Route path="/publication" render={(props) => (
                <PublicationPage authorized={this.state.authorized}
                                 getUserInfo={this.getUserInfo}
                                 getPublication={getPublication}
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
      </div>
    );
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
