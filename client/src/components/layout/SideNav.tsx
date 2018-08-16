import * as React from "react";
import { Link } from "react-router-dom";
import { IAuthState } from "../../interface";

const CloseLink = ({ onCloseClick }: { onCloseClick: Function }) => {
  return (
    <a className="close-link" href="#" onClick={e => onCloseClick(e)}>
      {" "}
      &times;{" "}
    </a>
  );
};

export interface SideNavProps {
  visible: boolean;
  authState: IAuthState;
  onCloseClick: Function;
}

export default class SideNav extends React.Component<SideNavProps, any> {
  public render() {
    const { authState, visible, onCloseClick } = this.props;
    const { authenticated } = authState;
    return (
      <div className={`side-nav ${visible ? "visible" : ""}`}>
        <CloseLink onCloseClick={onCloseClick} />
        <Link to="/">Home</Link>
        {authenticated && <Link to="/recent">Recent</Link>}
        {authenticated && <Link to="/new-post">New Post</Link>}
      </div>
    );
  }
}
