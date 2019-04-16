import React, { Component } from "react";
import { IconButton } from "office-ui-fabric-react";
import { libraryService } from "../../services";

import "./MetricBar.css";
class MetricBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.template && nextProps.template !== prevState.template) {
      var sampleLiked = localStorage.getItem(nextProps.template);
      if (sampleLiked === "liked") {
        return {
          liked: true
        };
      } else
        return {
          liked: false
        };
    } else return null;
  }

  getAuthorName(repository) {
    var parser = document.createElement("a");
    parser.href = repository;
    var pathArray = parser.pathname.split("/");
    var username = pathArray.length > 1 ? pathArray[1] : null;
    return username;
  }

  handleLikeClick() {
    if (this.state.liked === true) {
      localStorage.setItem(this.props.template, "unliked");
      this.setState({ liked: false });
    } else {
      localStorage.setItem(this.props.template, "liked");
      this.setState({ liked: true });
    }

    libraryService
      .updateUserActionStats(this.props.template, "like")
      .then(response => response.body)
      .catch(error => console.log(error));
  }
  render() {
    let username = this.getAuthorName(this.props.repository);
    let iconName = "Like";
    let title = "Like";
    let numlikes = this.props.numlikes;
    if (this.state.liked) {
      iconName = "LikeSolid";
      title = "Liked";
      numlikes = this.props.numlikes + 1;
    }

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
          iconProps={{ iconName: iconName }}
          title={title}
          ariaLabel={title}
          onClick={() => this.handleLikeClick()}
        />
        <div>{numlikes}</div>
      </div>
    );
  }
}

export default MetricBar;
