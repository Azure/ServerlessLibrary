import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { userService } from '../../services';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isAuthenticated: false
    }
  }

  componentDidMount() {
    userService.isAuthenticated().then((isAuthenticated) => {
      this.setState({
        loading: false,
        isAuthenticated
      });
    });
  }

  render() {
    const {component: Component, ...rest} = this.props;
    
    return (
      <Route
        {...rest}
        render={props => (
          this.state.isAuthenticated
            ? <Component {...props} />
            : (
              this.state.loading 
                ? <div></div> 
                : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
            )
      )} />
    );
  }
}

export { PrivateRoute };
