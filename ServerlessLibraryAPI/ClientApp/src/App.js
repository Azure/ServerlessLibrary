import React, { Component } from 'react';
import './App.css';


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
          <div className="header" >
            <span>header </span>
          </div>
         <div className="maincontent">
          maincontent
         </div>
      </div>
    );
  }
}

export default App;
