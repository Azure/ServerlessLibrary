import React, { Component } from "react";
import { connect } from "react-redux";
import { Persona, PersonaSize, Icon } from "office-ui-fabric-react";
import { getTheme } from "office-ui-fabric-react";

class UserPersona extends Component {
  _onRenderInitials() {
    return <Icon iconName="Contact" />;
  }

  render() {
    const theme = getTheme();
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

    const { loading, loggedIn, user } = this.props;
    if (loading) {
      return null;
    }

    return loggedIn ? (
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
      />
    ) : (
      <Persona
        styles={personaStyles}
        text="Guest"
        imageAlt="Guest"
        size={PersonaSize.size28}
        onRenderInitials={this._onRenderInitials}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.authentication.loading,
  loggedIn: state.authentication.loggedIn,
  user: state.authentication.user
});

const UserPersonaContainer = connect(mapStateToProps)(UserPersona);

export default UserPersonaContainer;
