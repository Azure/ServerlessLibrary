import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link as FabricLink } from 'office-ui-fabric-react';

class Login extends Component {
  constructor(props) {
    super(props);

    let { from } = this.props.location.state || { from: { pathname: '/' } };

    this.state = {
      redirectToReferrer: false,
      from: from
    };
  }

  onLogin = () => {
    let { from } = this.state;
    window.location = `/api/user/login?returnUrl=${from.pathname}`;
  }

  render() {
    let { from, redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <FabricLink href={`/api/user/login?returnUrl=${from.pathname}`}>Sign in</FabricLink>
        <br/>
        <FabricLink href={'/api/user/logout'}>Sign out</FabricLink>
        <br/>
        <button onClick={this.onLogin}>Sign in</button>
      </div>
    )
  }
}

export { Login };
