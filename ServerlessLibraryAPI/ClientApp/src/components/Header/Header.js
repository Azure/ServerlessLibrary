import React, { Component } from 'react';
import { Link, Persona, PersonaSize } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { getTheme, FontSizes } from '@uifabric/styling';

import './Header.scss';
import { userService } from '../../services';

const theme = getTheme();
const linkStyles = () => {
  return {
    root: {
      marginLeft: '15px',
      lineHeight: '40px',
      fontSize: FontSizes.mediumPlus,
      color: theme.palette.white,
      selectors: {
        '&:active, &:hover, &:active:hover, &:visited': {
          color: theme.palette.white
        }
      }
    }
  }
};

const personaStyles = () => {
  return {
    root: {
      height: '40px',
      color: theme.palette.white,
      float: 'right',
      selectors: {
        ':hover': {
          selectors: {
            $primaryText: {
              color: theme.palette.white,
            }
          }
        }
      }
    },
    details: 
    {
      width: '85px'
    },
    primaryText: {
      color: theme.palette.white
    }
  }
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentWillMount() {
    initializeIcons();
}
  componentDidMount() {
    this.setState({
      user: {}
    });
    userService.getCurrentUser()
     .then(user => this.setState({ user }))
     .catch(error => console.log(error));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="headerbar" >
        <span>
          <Link styles={linkStyles} href="https://azure.microsoft.com/" target="_blank">Microsoft Azure</Link>
          {user && user.firstName && user.firstName !== '' &&
            <Persona 
              styles={personaStyles}
              text={user.firstName}
              imageUrl={user.avatarUrl}
              imageAlt={user.fullName}
              size={PersonaSize.size28}
              hidePersonaDetails={false}
              showUnknownPersonaCoin={user.firstName === ''}
            />
          }
        </span>
      </div>
    );
  }
}

export { Header };
