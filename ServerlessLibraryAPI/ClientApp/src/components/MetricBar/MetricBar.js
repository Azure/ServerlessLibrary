import React, { Component } from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import './MetricBar.css';
class MetricBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numlikes: props.numlikes
    }
  }

  getAutherName(repository) {
    var parser = document.createElement('a');
    parser.href = repository;
    var pathArray = parser.pathname.split('/');
    var username = pathArray.length > 1 ? pathArray[1] : null;
    return username;
  }

  render() {
    let username = this.getAutherName(this.props.repository);
    let lastupdated;
    if (this.props.lastupdated) {
      lastupdated = <span>| Last updated: {this.props.lastupdated} days ago</span>
    }
    return (
      <div className="metrics" >
        <span>By: {username} | {this.props.downloads}  downloads {lastupdated}</span>
        <IconButton iconProps={{ iconName: 'LikeSolid' }} title="Like" ariaLabel="Like" onClick={() => console.log("liked")} />
        <span>{this.props.numlikes}</span>

      </div>
    )
  }
}


export default MetricBar;