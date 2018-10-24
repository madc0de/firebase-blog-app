import * as React from "react";
import SideNav from "./SideNav";
import { connect, Dispatch } from "react-redux";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";
import { NavLink } from "react-router-dom";

import blogSettings from "../../blogSettings";

const OpenNavButton = (props: { onClick: React.EventHandler<any> }) => (
  <a href="#" className="open-nav-button" onClick={props.onClick}>
    &#9776;
  </a>
);

interface FromStateProps {
  authState: AuthState;
}

export interface HeaderProps extends FromStateProps {
  children?: any;
}

interface HeaderState {
  navVisible: boolean;
}

class Header extends React.Component<HeaderProps & Dispatch, HeaderState> {
  state = {
    navVisible: false
  };

  showNav = () => {
    this.setNavVisible(true);
  };

  hideNav = () => {
    this.setNavVisible(false);
  };

  setNavVisible = (visible: boolean) => {
    this.setState({ navVisible: visible });
  };

  public render() {
    return (
      <React.Fragment>
        <header className="blog-header">
          <NavLink to="/" className="link">
            <h1 className="title">{blogSettings.blog_title}</h1>
          </NavLink>
          <h4 className="description">{blogSettings.blog_description}</h4>

          <OpenNavButton onClick={this.showNav} />
        </header>
        <SideNav
          visible={this.state.navVisible}
          onClose={this.hideNav}
          authState={this.props.authState}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): FromStateProps => ({
  authState: state.authState
});

const _Header = connect(mapStateToProps)(Header);

export default _Header;
