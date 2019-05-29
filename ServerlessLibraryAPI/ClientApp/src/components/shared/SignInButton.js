import React, { Component } from "react";
import { PrimaryButton } from "office-ui-fabric-react";

class SignInButton extends Component {
  handleButtonClick() {
    const currentLocation = encodeURIComponent(window.location);
    window.location = `/api/user/login?returnUrl=${currentLocation}`;
  }

  render() {
    const buttonStyles = {
      root: {
        fontSize: "12px",
        height: "32px"
      },
      label: {
        fontWeight: "normal"
      }
    };

    return (
      <PrimaryButton
        styles={buttonStyles}
        primary={true}
        iconProps={{ iconName: "GitHub-16px" }}
        onClick={this.handleButtonClick}
      >
        Sign in with GitHub
      </PrimaryButton>
    );
  }
}

export default SignInButton;
