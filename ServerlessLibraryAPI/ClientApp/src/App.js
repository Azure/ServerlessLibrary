import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'office-ui-fabric-react';

import './App.css';
import { Header } from './components/Header';
import { Contribute } from './components/Contribute/Contribute';

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
          <Route exact path='/' render={() => 
            <Link href='/Contribute'>Contributions</Link>
          } />
          <Route exact path='/Contribute' component={Contribute} />
        </Switch>
      </div>
    );
  }
}

export default App;
