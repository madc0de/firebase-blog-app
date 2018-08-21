import * as React from "react";
import SideNav from "./SideNav";
import { connect, Dispatch } from "react-redux";
import { AuthState } from "../../interface/AuthState";
import { BlogSettingData } from "../../interface/BlogSettingData";
import { AppState } from "../../interface/AppState";


const OpenNavButton = (props: { onClick: React.EventHandler<any> }) => (
  <a href="#" className="open-nav-button" onClick={props.onClick}>
    &#9776;
  </a>
);

interface FromStateProps {
  authState: AuthState;
  blogSettings: BlogSettingData;
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
    const { blogSettings } = this.props;

    return (
      <React.Fragment>
        <header className="blog-header">
          <div className="overlay">
            <h1 className="title">{blogSettings.blog_title}</h1>
            <div className="description">{blogSettings.blog_description}</div>

            <OpenNavButton onClick={this.showNav} />
          </div>
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
  authState: state.authState,
  blogSettings: state.blogSettingsState
});

const _Header = connect(mapStateToProps)(Header);

export default _Header;
