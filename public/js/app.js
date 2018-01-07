import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Route, BrowserRouter as Router, browserHistory, Switch} from 'react-router-dom';

import Header from '../components/header';
import Publications from "../components/Publications";

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
  // componentDidMount() {
  //   this.getUserInfo();
  // }

  // renderProject(project, i) {
  //   let ref = 'project' + i;
  //   return (<Project ref={ref} key={i} index={i} user={this.state.user} project={project}
  //                    closeAllDescriptions={this.closeAllDescriptions} getProjectsInfo={this.getProjectsInfo}
  //                    closeAllTasks={this.closeAllTasks}/>);
  // }

  render() {
    return (
      <div>
        <Header/>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={Publications}/>
            {/*<Route path="/signup" component={SignUp}/>*/}
            {/*<Route path="/login" component={Login}/>*/}
          </Switch>
        </Router>
      </div>
    );
    // return (
    //   <div>
    //     <Header user={this.state.user} getProjectsInfo={this.getProjectsInfo}/>
    //     <main>
    //       <div className="project-box">
    //         {this.state.projects.map(this.renderProject)}
    //       </div>
    //     </main>
    //   </div>
    // );
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
