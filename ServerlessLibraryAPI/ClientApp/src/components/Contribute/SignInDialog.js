import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Dialog, DialogFooter, DefaultButton } from "office-ui-fabric-react";

import SignInButton from "../shared/SignInButton";

class SignInDialog extends Component {
  constructor(props) {
    super(props);
    this.handleHomeButtonClick = this.handleHomeButtonClick.bind(this);
  }

  handleHomeButtonClick() {
    this.props.history.push("/");
  }

  render() {
    const footerStyles = {
      actionsRight: {
        textAlign: "center",
        marginRight: "0px"
      }
    };
    const buttonStyles = {
      root: {
        fontSize: "12px",
        height: "32px",
        minWidth: "40px",
        backgroundColor: "white",
        border: "1px solid #0078D7",
        color: "#0058AD"
      },
      rootHovered: {
        border: "1px solid #0078D7",
        color: "#0058AD"
      },
      label: {
        fontWeight: "normal"
      }
    };

    const { loading, loggedIn } = this.props;
    if (loading) {
      return null;
    }

    return (
      <div>
        <Dialog
          hidden={loggedIn}
          dialogContentProps={{
            title: "Please sign in",
            subText: "Please sign in to continue."
          }}
          modalProps={{
            isBlocking: true
          }}
        >
          <DialogFooter styles={footerStyles}>
            <SignInButton />
            <DefaultButton
              styles={buttonStyles}
              text="Home"
              onClick={this.handleHomeButtonClick}
            />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authentication.loading,
  loggedIn: state.authentication.loggedIn
});

const SignInDialogContainer = connect(mapStateToProps)(SignInDialog);

export default withRouter(SignInDialogContainer);
