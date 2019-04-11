import React, { Component } from "react";
import { IconButton } from "office-ui-fabric-react/lib/index";
import { withRouter } from "react-router-dom";
import MetricBar from "../MetricBar/MetricBar";
import {
  backButtonIconContainerStyle,
  backButtonStyles,
  detailPageHeaderStyle,
  detailPageTitleStyle,
  sampleTitleStyle,
  sampleDescriptionStyle
} from "./DetailPageHeader.styles";

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

    return (
      <div style={detailPageHeaderStyle}>
        <div style={detailPageTitleStyle}>
          <div style={backButtonIconContainerStyle}>
            <IconButton
              iconProps={{ iconName: "Back" }}
              title="Like"
              ariaLabel="Like"
              style={backButtonStyles.button}
              onClick={() => this.handleBackButtonClick()}
            />
          </div>
          <div style={sampleTitleStyle}>
            <span>{title}</span>
          </div>
        </div>
        <MetricBar
          numlikes={numlikes}
          repository={repository}
          downloads={totaldownloads}
        />
        <p style={sampleDescriptionStyle}>{description}</p>
      </div>
    );
  }
}

export default withRouter(DetailPageHeader);
