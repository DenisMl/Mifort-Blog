import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Cookies from 'universal-cookie';
import {Route, BrowserRouter, browserHistory, Switch} from 'react-router-dom';

import Header from './components/header/header';
import Publications from "./components/publications/publications";
import PublicationPage from "./components/publicationPage/publicationPage";
import AddPublication from "./components/addPublication/addPublication";
import Login from "./components/login/login";
import Register from "./components/register/register";

import {getUserInfo, getPublications, getUsersByIDs, setAppState, getPublication} from "./js/methods";
import './style.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: ''
      }
    };

    this.getUserInfo = getUserInfo.bind(this);
    this.getPublications = getPublications.bind(this);
    this.setAppState = setAppState.bind(this);
  };

  componentWillMount() {
    const cookies = new Cookies();
    let authorized = (cookies.get('Authorized') === 'true');
    if (authorized) {
      this.getPublications();
      this.getUserInfo();
    }
    this.setState({authorized: authorized});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="all-wrapper">
          <Header user={this.state.user}/>
          <div className="main-wrapper">
            <Switch>
              <Route exact path="/" render={(props) => (
                <Publications authorized={this.state.authorized}
                              getUserInfo={this.getUserInfo}
                              publications={this.state.publications}
                              getUsersByIDs={getUsersByIDs}
                              currentUserId={this.state.user.id}
                              setAppState={this.setAppState}
                /> )}
              />

              <Route path="/publication" render={(props) => (
                <PublicationPage authorized={this.state.authorized}
                                 getUserInfo={this.getUserInfo}
                                 publications={this.state.publications}
                                 getPublication={getPublication}
                                 getUsersByIDs={getUsersByIDs}
                /> )}
              />

              <Route path="/addPublication" render={(props) => (
                <AddPublication setAppState={this.setAppState}
                /> )}
              />

              <Route path="/login" render={(props) => (
                <Login authorized={this.state.authorized}
                /> )}
              />

              <Route path="/register" render={(props) => (
                <Register authorized={this.state.authorized}/>
              )}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
