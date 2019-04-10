import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component: Component, loggedIn, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props =>
          loggedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

const PrivateRouteContainer = connect(mapStateToProps)(PrivateRoute);

export default PrivateRouteContainer;
