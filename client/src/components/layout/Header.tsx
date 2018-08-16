import * as React from "react";
import SideNav from "./SideNav";
import { connect, Dispatch } from "react-redux";
import { IAppState, IAuthState, IBlogSetting } from "../../interface";
import { blogSettingActions } from '../../store/actions/';


const OpenNavButton = (props: {onClick: React.EventHandler<any>}) => (
  <a href="#" className="open-nav-button" onClick={props.onClick}>
    &#9776;
  </a>
);

interface DispatchProps {
  loadBlogSettings(): void
}

interface FromStateProps {
  authState: IAuthState
  blogSettings: IBlogSetting
}

export interface HeaderProps extends FromStateProps, DispatchProps {
  children?: any;
}

interface HeaderState {
  navVisible: boolean;
}


class Header extends React.Component<HeaderProps & Dispatch, HeaderState> {
  state = {
    navVisible: false
  };

  componentDidMount() {
    this.props.loadBlogSettings()  
  }

  showNav = (e: React.SyntheticEvent) => {
    this.setNavVisible(true);
  };

  hideNav = (e: React.SyntheticEvent) => {
    this.setNavVisible(false);
  };

  setNavVisible = (visible: boolean) => {
    this.setState({ navVisible: visible });
  };

  public render() {
    const { blogSettings } = this.props

    return (
      <React.Fragment>
        <header>
          <div className="overlay">
            <h1 className="title">{blogSettings.blog_title}</h1>
            <div className="description">{blogSettings.blog_description}</div>

           <OpenNavButton onClick={this.showNav} />
          </div>
        </header>
        <SideNav
          visible={this.state.navVisible}
          onCloseClick={this.hideNav}
          authState={this.props.authState}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadBlogSettings: () => dispatch(blogSettingActions.asyncGetBlogSettingsAction())
})

const mapStateToProps = (state: IAppState): FromStateProps => ({
    authState: state.authState,
  blogSettings: state.blogSettingState
})

const _Header = connect(mapStateToProps, mapDispatchToProps)(Header);

export default _Header;
