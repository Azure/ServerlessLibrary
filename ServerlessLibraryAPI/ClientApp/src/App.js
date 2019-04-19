import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import DetailView from "./components/DetailView/DetailView";
import LoginDialog from "./components/LoginDialog/LoginDialog";
import Contribute from "./components/Contribute/Contribute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { sampleActions } from "./actions/sampleActions";
import { userActions } from "./actions/userActions";
import { libraryService, userService } from "./services";

class App extends Component {
  componentDidMount() {
    libraryService
      .getAllSamples()
      .then(samples => this.props.getSamplesSuccess(samples))
      .catch(error => console.log(error));

    userService
      .getCurrentUser()
      .then(user => this.props.getCurrentUserSuccess(user))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div id="container">
        <div id="header">
          <Header />
        </div>
        <div id="main">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/sample/:id" component={DetailView} />
            <Route exact path="/login" component={LoginDialog} />
            <PrivateRoute exact path="/contribute" component={Contribute} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getSamplesSuccess: sampleActions.getSamplesSuccess,
  getCurrentUserSuccess: userActions.getCurrentUserSuccess
};
const AppContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

export default AppContainer;
