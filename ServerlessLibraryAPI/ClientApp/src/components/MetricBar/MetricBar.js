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
    if (nextProps.id && nextProps.id !== prevState.id) {
      var sampleLiked = localStorage.getItem(nextProps.id);
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

  handleLikeClick() {
    if (this.state.liked === true) {
      localStorage.setItem(this.props.id, "unliked");
      this.setState({ liked: false });
    } else {
      localStorage.setItem(this.props.id, "liked");
      this.setState({ liked: true });
    }

    libraryService
      .updateUserActionStats(this.props.id, "like")
      .then(response => response.body)
      .catch(error => console.log(error));
  }

  render() {
    let username = this.props.author;
    let iconName = "Like";
    let title = "Like";
    let likes = this.props.likes;
    if (this.state.liked) {
      iconName = "LikeSolid";
      title = "Liked";
      likes = this.props.likes + 1;
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
        <div>{likes}</div>
      </div>
    );
  }
}

export default MetricBar;
