import React, { Component } from 'react';

import './App.css';
import { Header } from './components/Header';

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
        <div className="maincontent">
          maincontent
        </div>
      </div>
    );
  }
}

export default App;
