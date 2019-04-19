import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { IconButton } from "office-ui-fabric-react";

import "./PageHeaderWithBackButton.scss";

class PageHeaderWithBackButton extends Component {
  constructor(props) {
    super(props);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
  }

  handleHomeButtonClick() {
    this.props.history.push("/");
  }

  render() {
    let { title } = this.props;

    const homeButton = {
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
              iconProps={{ iconName: "Home" }}
              title="Home"
              ariaLabel="Home"
              style={homeButton.button}
              onClick={() => this.handleHomeButtonClick()}
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
