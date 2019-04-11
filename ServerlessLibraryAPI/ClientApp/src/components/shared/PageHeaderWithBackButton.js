import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IconButton } from "office-ui-fabric-react";

import "./PageHeaderWithBackButton.scss";

class PageHeaderWithBackButton extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    this.props.history.goBack();
  }

  render() {
    let { title } = this.props;

    const backButton = {
      button: {
        width: 17,
        height: 18,
        marginRight: 12
      }
    };

    return (
      <div className="page-header">
        <div className="page-title-container">
          <div className="back-button-icon-container">
            <IconButton
              iconProps={{ iconName: "Back" }}
              title="Back"
              ariaLabel="Back"
              style={backButton.button}
              onClick={() => this.handleBackButtonClick()}
            />
          </div>
          <div className="page-title">
            <span>{title}</span>
          </div>
        </div>
        <div className="page-description-container">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(PageHeaderWithBackButton);
