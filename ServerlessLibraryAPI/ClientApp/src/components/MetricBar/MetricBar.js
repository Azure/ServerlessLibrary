import React, { Component } from "react";
import { IconButton } from "office-ui-fabric-react/lib/index";

import "./MetricBar.css";
class MetricBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numlikes: props.numlikes,
      liked: false,
      title: "Like",
      iconName: "Like"
    };
  }

  getAutherName(repository) {
    var parser = document.createElement("a");
    parser.href = repository;
    var pathArray = parser.pathname.split("/");
    var username = pathArray.length > 1 ? pathArray[1] : null;
    return username;
  }
  componentDidMount() {
    var sampleLiked = localStorage.getItem(this.props.repository);
    if (sampleLiked === "clicked") {
      this.setState({ liked: true });
      this.setState({ title: "Liked" });
      this.setState({ iconName: "LikeSolid" });
    }
  }

  handleLikeClick() {
    if (!this.state.liked) {
      localStorage.setItem(this.props.repository, "clicked");
      this.setState({ liked: true });
      this.setState({ title: "Liked" });
      this.setState({ iconName: "LikeSolid" });
    }
  }
  render() {
    let username = this.getAutherName(this.props.repository);
    let lastupdated;
    if (this.props.lastupdated) {
      lastupdated = (
        <span>| Last updated: {this.props.lastupdated} days ago</span>
      );
    }

    const styles = {
      button: {
        width: 16,
        height: 16,
        padding: 0,
        marginLeft: 7,
        marginRight: 7
      }
    };
    return (
      <div className="metrics">
        <div>
          <span>
            By: {username} | {this.props.downloads} downloads {lastupdated} |
          </span>
        </div>
        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          tooltipStyles={styles.tooltip}
          iconProps={{ iconName: this.state.iconName }}
          title={this.state.title}
          ariaLabel={this.state.title}
          onClick={() => this.handleLikeClick()}
        />
        <div>{this.props.numlikes}</div>
      </div>
    );
  }
}

export default MetricBar;
