import React, { Component } from 'react';
import { AddContribution } from './AddContribution';

class Contribute extends Component {
  render() {
    return (
      <div>
        <h3>Contributions</h3>
        <p>This is where you can see all your existing contributions. You can also add a new contribution by clicking on the add new contribution link.</p>
        <br />
        <AddContribution />
      </div>
    )
  }
}

export { Contribute };
