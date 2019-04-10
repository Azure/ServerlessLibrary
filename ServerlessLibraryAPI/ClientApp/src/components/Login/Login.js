import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link as FabricLink } from "office-ui-fabric-react";

class Login extends Component {
  constructor(props) {
    super(props);

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    this.state = {
      from: from
    };
  }

  onLogin = () => {
    const { from } = this.state;
    window.location = `/api/user/login?returnUrl=${from.pathname}`;
  };

  render() {
    const { from } = this.state;
    const { loggedIn } = this.props;

    if (loggedIn) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <FabricLink onClick={this.onLogin}>Sign in</FabricLink>
        <br />
        <button onClick={this.onLogin}>Sign in</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

const LoginContainer = connect(mapStateToProps)(Login);

export default LoginContainer;
