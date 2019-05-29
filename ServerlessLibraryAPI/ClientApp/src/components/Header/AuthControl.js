import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ActionButton, ContextualMenuItemType } from "office-ui-fabric-react";

import { userService } from "../../services";
import { userActions } from "../../actions/userActions";
import SignInButton from "../shared/SignInButton";
import UserPersona from "./UserPersona";

class AuthControl extends Component {
  constructor(props) {
    super(props);

    this._renderMenuList = this._renderMenuList.bind(this);
    this._onSignoutClick = this._onSignoutClick.bind(this);
    this._onContributionsClick = this._onContributionsClick.bind(this);
  }

  getMenuItems() {
    const { user } = this.props;
    const userName =
      user.fullName && user.fullName !== "" ? user.fullName : user.displayName;

    return [
      {
        key: "Header",
        itemType: ContextualMenuItemType.Header,
        text: "Logged in as: " + userName
      },
      {
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: "contributions",
        text: "My contributions",
        onClick: this._onContributionsClick
      },
      {
        key: "divider_1",
        itemType: ContextualMenuItemType.Divider
      },
      {
        key: "signOut",
        text: "Sign out",
        onClick: this._onSignoutClick
      }
    ];
  }

  _renderMenuIcon() {
    return null;
  }

  _renderMenuList(menuListProps, defaultRender) {
    const { loggedIn } = this.props;
    if (loggedIn) {
      return <div>{defaultRender(menuListProps)}</div>;
    }

    return (
      <div className="signin-button-container">
        <SignInButton />
      </div>
    );
  }

  _onContributionsClick() {
    this.props.history.push("/contribute");
  }

  _onSignoutClick() {
    this.props.logout(); // clear the redux store before making a call to the backend
    userService
      .logout()
      .then(() => {
        // do nothing
      })
      .catch(() => {
        // do nothing
      });
  }

  render() {
    return (
      <span>
        <div className="auth-control">
          <ActionButton
            onRenderMenuIcon={this._renderMenuIcon}
            menuProps={{
              onRenderMenuList: this._renderMenuList,
              shouldFocusOnMount: true,
              items: this.getMenuItems()
            }}
          >
            <UserPersona />
          </ActionButton>
        </div>
      </span>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  user: state.authentication.user
});

const mapDispatchToProps = {
  logout: userActions.logout
};

const AuthControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthControl);

export default withRouter(AuthControlContainer);
