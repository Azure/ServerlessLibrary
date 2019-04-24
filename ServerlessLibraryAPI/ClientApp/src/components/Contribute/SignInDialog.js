import React, { Component } from "react";
import { connect } from "react-redux";
import { Dialog, DialogFooter } from "office-ui-fabric-react";

import SignInButton from "../shared/SignInButton";

class SignInDialog extends Component {
  render() {
    const footerStyles = {
      actionsRight: {
        textAlign: "center",
        marginRight: "0px"
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

export default SignInDialogContainer;
