import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Link as FabricLink } from 'office-ui-fabric-react';

import './App.css';
import { PrivateRoute } from './components/PrivateRoute';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { Contribute } from './components/Contribute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        samples: []
    }
    this.getCurrentSample = this.getCurrentSample.bind(this)
}

getCurrentSample(id)
{
  return this.state.samples.filter(s=>s.title===id);
}

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' render={() => {
            return (
              <div className="maincontent">
                maincontent
                <FabricLink as={Link} to='/contribute'>Contributions</FabricLink>
              </div>
            );
          }} 
          />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/contribute' component={Contribute} />
        </Switch>
      </div>
    );
  }
}

export default App;
