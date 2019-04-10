import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link as FabricLink } from "office-ui-fabric-react";

import { userService } from "../../services";
import { userActions } from "../../actions/userActions";

class Logout extends Component {
  onLogout = () => {
    this.props.logout(); // clear the redux store before the api call
    userService.logout().then(this.props.history.push("/"));
  };

  render() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      return <div>You are not logged in!</div>;
    }
    return (
      <div>
        <FabricLink onClick={this.onLogout}>Sign out</FabricLink>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

const mapDispatchToProps = {
  logout: userActions.logout
};

const LogoutContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Logout)
);

export default LogoutContainer;
