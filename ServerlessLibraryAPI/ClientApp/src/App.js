import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { Header } from './components/Header';
import { Login } from './components/Login';

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
              </div>
            );
          }} 
          />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
