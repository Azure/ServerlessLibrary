import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Main from "./components/Main/Main";
import "./App.css";
import { Header } from "./components/Header";
import DetailView from "./components/DetailView/DetailView";
import { samplesReceived } from "./actions/FilterChangeActions";
import { Login } from "./components/Login";
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
