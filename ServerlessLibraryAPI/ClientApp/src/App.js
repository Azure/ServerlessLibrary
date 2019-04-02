import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Main from "./components/Main/Main";
import { Header } from "./components/Header";
import DetailView from "./components/DetailView/DetailView";
import { Login } from "./components/Login";
import { Contribute } from "./components/Contribute/Contribute";
import { samplesReceived } from "./actions/FilterChangeActions";
import { libraryService } from "./services";

class App extends Component {
  componentDidMount() {
    libraryService
      .getAllSamples()
      .then(samples => this.props.samplesReceived(samples))
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
            <Route exact path="/login" component={Login} />
            <Route exact path="/Contribute" component={Contribute} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  samplesReceived
};
const AppContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

export default AppContainer;
