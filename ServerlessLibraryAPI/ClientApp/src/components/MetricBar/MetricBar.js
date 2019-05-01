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
    // If user already liked, then decrement like count and set the sentiment state to none.
    // If in past disliked and choose to like the sample, then decrement dislike count and increment like count
    // If not action taken ealier, just increment like count and set sentiment state to liked.
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

    var sentimentPayload = {
      Id: this.props.id,
      LikeChanges: likeChanges,
      DislikeChanges: dislikeChanges
    };

    libraryService
      .updateUserSentimentStats(sentimentPayload)
      .then(() => {
        // do nothing
      })
      .catch(() => {
        // do nothing
      });
  }

  render() {
    let { author, downloads, createddate, likes, dislikes } = this.props;
    let createdonDate = new Date(createddate);
    let createdonLocaleDate = createdonDate.toLocaleDateString();

    let likeIconName = "Like";
    let likeTitle = "Like";
    let dislikeIconName = "Dislike";
    let dislikeTitle = "Dislike";

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
            By: {author} | {downloads}{" "}
            {downloads === 1 ? "download" : "downloads"} | Created on:{" "}
            {createdonLocaleDate} |
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
