import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "office-ui-fabric-react";
import { getTheme } from "office-ui-fabric-react";

import "./Header.scss";
import AuthControl from "./AuthControl";

class Header extends Component {
  render() {
    const theme = getTheme();
    const linkStyles = {
      root: {
        marginLeft: "15px",
        lineHeight: "40px",
        fontSize: "14px",
        color: theme.palette.white,
        selectors: {
          "&:active, &:hover, &:active:hover, &:visited": {
            color: theme.palette.white
          }
        }
      }
    };

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
          <AuthControl />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
