import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PrimaryButton } from "office-ui-fabric-react";

import "./LoginDialog.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    const currentLocation = encodeURIComponent(window.location);
    window.location = `/api/user/login?returnUrl=${currentLocation}`;
  }

  render() {
    const buttonStyles = {
      root: {
        fontSize: "12px",
        height: "32px",
        minWidth: "130px",
        paddingRight: "10px",
        paddingLeft: "10px",
        marginBottom: "10px",
        marginTop: "10px",
        border: "1px solid",
        borderRadius: "2px"
      },
      label: {
        fontWeight: "normal"
      }
    };

    return (
      <div className="login-dialog">
        <PrimaryButton
          styles={buttonStyles}
          primary={true}
          iconProps={{ iconName: "GitHub-16px" }}
          onClick={this.handleButtonClick}
        >
          Sign in with GitHub
        </PrimaryButton>
      </div>
    );
  }
}

export default withRouter(Login);
