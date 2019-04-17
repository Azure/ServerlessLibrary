import React, { Component } from "react";
import { IconButton } from "office-ui-fabric-react";
import { libraryService } from "../../services";

import "./MetricBar.css";
class MetricBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentimentAction: "none"
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id && nextProps.id !== prevState.id) {
      return { sentimentAction: localStorage.getItem(nextProps.id) };
    }

    return null;
  }

  handleLikeClick() {
    if (this.state.sentimentAction === "liked") {
      this.updateSentiment("none", -1, 0);
    } else if (this.state.sentimentAction === "disliked") {
      this.updateSentiment("liked", 1, -1);
    } else {
      this.updateSentiment("liked", 1, 0);
    }
  }

  handleDislikeClick() {
    if (this.state.sentimentAction === "liked") {
      this.updateSentiment("disliked", -1, 1);
    } else if (this.state.sentimentAction === "disliked") {
      this.updateSentiment("none", 0, -1);
    } else {
      this.updateSentiment("disliked", 0, 1);
    }
  }

  updateSentiment(choice, likeChanges, dislikeChanges) {
    localStorage.setItem(this.props.id, choice);
    this.setState({ sentimentAction: choice });
    libraryService
      .updateUserSentimentStats(this.props.id, likeChanges, dislikeChanges)
      .then(response => response.body)
      .catch(error => console.log(error));
  }

  render() {
    let {author, downloads, likes, dislikes} = this.props;
    let likeIconName = "Like";
    let likeTitle = "Like";
    let dislikeIconName = "Dislike";
    let dislikeTitle = "Disike";
 
    if (this.state.sentimentAction === "liked") {
      likeIconName = "LikeSolid";
      likeTitle = "Liked";
      likes = likes + 1;
    }

    if (this.state.sentimentAction === "disliked") {
      dislikeIconName = "DislikeSolid";
      dislikeTitle = "Disliked";
      dislikes = dislikes + 1;
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
            By: {author} | {downloads} downloads {lastupdated} |
          </span>
        </div>

        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          tooltipStyles={styles.tooltip}
          iconProps={{ iconName: likeIconName }}
          title={likeTitle}
          ariaLabel={likeTitle}
          onClick={() => this.handleLikeClick()}
        />
        <div>{likes}</div>

        <IconButton
          style={styles.button}
          iconStyle={styles.icon}
          tooltipStyles={styles.tooltip}
          iconProps={{ iconName: dislikeIconName }}
          title={dislikeTitle}
          ariaLabel={dislikeTitle}
          onClick={() => this.handleDislikeClick()}
        />
        <div>{dislikes}</div>
      </div>
    );
  }
}

export default MetricBar;
