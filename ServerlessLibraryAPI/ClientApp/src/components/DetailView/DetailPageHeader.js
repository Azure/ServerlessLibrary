import React, { Component } from "react";
import { IconButton } from "office-ui-fabric-react/lib/index";
import { withRouter } from "react-router-dom";
import MetricBar from "../MetricBar/MetricBar";

import "./DetailPageHeader.scss";

class DetailPageHeader extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    this.props.history.goBack();
  }

  render() {
    let {
      title,
      repository,
      totaldownloads,
      description,
      numlikes
    } = this.props;

    const backButton = {
      button: {
        width: 17,
        height: 18,
        marginRight: 12
      }
    };
    return (
      <div className="detail-page-header">
        <div className="detail-page-title">
          <div className="back-button-icon-container">
            <IconButton
              iconProps={{ iconName: "Back" }}
              title="Back"
              ariaLabel="Back"
              style={backButton.button}
              onClick={() => this.handleBackButtonClick()}
            />
          </div>
          <div className="sample-title">
            <span>{title}</span>
          </div>
        </div>
        <MetricBar
          numlikes={numlikes}
          repository={repository}
          downloads={totaldownloads}
        />
        <p className="sample-description">{description}</p>
      </div>
    );
  }
}

export default withRouter(DetailPageHeader);
