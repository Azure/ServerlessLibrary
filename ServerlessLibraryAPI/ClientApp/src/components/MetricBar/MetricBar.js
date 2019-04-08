import React, { Component } from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

import './MetricBar.css';
class MetricBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numlikes: props.numlikes,
      liked: false,
      title: "Like",
      iconName: 'Like'
    }
  }

  getAutherName(repository) {
    var parser = document.createElement('a');
    parser.href = repository;
    var pathArray = parser.pathname.split('/');
    var username = pathArray.length > 1 ? pathArray[1] : null;
    return username;
  }
  componentWillMount() {
    var myName = localStorage.getItem(this.props.repository);
    if (myName === "clicked") {
      this.setState({ liked: true })
      this.setState({ title: 'Liked' })
      this.setState({ iconName: 'LikeSolid' })
    }
  }

  handleLikeClick() {
    console.log("clicked" + this.state.liked);
    if (!this.state.liked) {
      localStorage.setItem(this.props.repository, "clicked");
      this.setState({ liked: true });
      this.setState({ title: 'Liked' });
      this.setState({ iconName: 'LikeSolid' });
    }
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
        <IconButton iconProps={{ iconName: this.state.iconName }} title={this.state.title} ariaLabel={this.state.title} onClick={() => this.handleLikeClick()} />
        <span>{this.props.numlikes}</span>

      </div>
    )
  }
}

export default MetricBar;