import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dialog } from "office-ui-fabric-react";

import "./App.css";

import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import DetailView from "./components/DetailView/DetailView";
import ContributionsPage from "./components/Contribute/Contribute";
import { sampleActions } from "./actions/sampleActions";
import { userActions } from "./actions/userActions";
import { libraryService, userService } from "./services";

const loginErrorMsg = "We were unable to log you in. Please try again later.";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showErrorDialog: false
    };
    this.onDismissErrorDialog = this.onDismissErrorDialog.bind(this);
  }

  componentDidMount() {
    libraryService
      .getAllSamples()
      .then(samples => this.props.getSamplesSuccess(samples))
      .catch(() => {
        // do nothing
      });

    this.props.getCurrentUserRequest();
    userService
      .getCurrentUser()
      .then(user => this.props.getCurrentUserSuccess(user))
      .catch(data => {
        this.props.getCurrentUserFailure();
        if (data.status !== 401) {
          this.setState({
            showErrorDialog: true
          });
        }
      });
  }

  onDismissErrorDialog() {
    this.setState({
      showErrorDialog: false
    });
  }

  render() {
    const { showErrorDialog } = this.state;
    return (
      <div id="container">
        <div id="header">
          <Header />
        </div>
        <div id="main">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/sample/:id" component={DetailView} />
            <Route exact path="/contribute" component={ContributionsPage} />
          </Switch>
        </div>
        {showErrorDialog && (
          <Dialog
            dialogContentProps={{
              title: "An error occurred!"
            }}
            hidden={!showErrorDialog}
            onDismiss={this.onDismissErrorDialog}
          >
            <p>{loginErrorMsg}</p>
          </Dialog>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getSamplesSuccess: sampleActions.getSamplesSuccess,
  getCurrentUserRequest: userActions.getCurrentUserRequest,
  getCurrentUserSuccess: userActions.getCurrentUserSuccess,
  getCurrentUserFailure: userActions.getCurrentUserFailure
};
const AppContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

export default AppContainer;
