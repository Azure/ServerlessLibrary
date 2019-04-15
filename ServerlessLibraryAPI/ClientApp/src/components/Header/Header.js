import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Persona, PersonaSize } from "office-ui-fabric-react";
import { getTheme, FontSizes } from "office-ui-fabric-react";

import "./Header.scss";
import { userService } from "../../services";
import { userActions } from "../../actions/userActions";

class Header extends Component {
  componentDidMount() {
    userService
      .getCurrentUser()
      .then(user => this.props.getCurrentUserSuccess(user))
      .catch(error => console.log(error));
  }

  render() {
    const theme = getTheme();
    const linkStyles = {
      root: {
        marginLeft: "15px",
        lineHeight: "40px",
        fontSize: FontSizes.mediumPlus,
        color: theme.palette.white,
        selectors: {
          "&:active, &:hover, &:active:hover, &:visited": {
            color: theme.palette.white
          }
        }
      }
    };

    const personaStyles = {
      root: {
        height: "40px",
        color: theme.palette.white,
        float: "right",
        selectors: {
          ":hover": {
            selectors: {
              $primaryText: {
                color: theme.palette.white
              }
            }
          }
        }
      },
      details: {
        width: "85px"
      },
      primaryText: {
        color: theme.palette.white
      }
    };

    const { user } = this.props;

    return (
      <div className="headerbar">
        <span>
          <Link
            styles={linkStyles}
            href="https://azure.microsoft.com/"
            target="_blank"
          >
            Microsoft Azure
          </Link>
          {user && user.displayName && user.displayName !== "" && (
            <Persona
              styles={personaStyles}
              text={user.displayName}
              imageUrl={user.avatarUrl}
              imageAlt={
                user.fullName && user.fullName !== ""
                  ? user.fullName
                  : user.displayName
              }
              size={PersonaSize.size28}
              hidePersonaDetails={false}
              showUnknownPersonaCoin={user.displayName === ""}
            />
          )}
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  user: state.authentication.user
});

const mapDispatchToProps = {
  getCurrentUserSuccess: userActions.getCurrentUserSuccess
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
