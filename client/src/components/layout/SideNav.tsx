import * as React from "react";
import { Link } from "react-router-dom";
import { AuthState } from "../../interface/AuthState";

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
  authState: AuthState;
  onClose: Function;
}

export default class SideNav extends React.Component<SideNavProps, any> {

  closeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    this.props.onClose();
  }

  public render() {
    const { visible, onClose } = this.props;

    return (
      <div
        className={`side-nav ${visible ? "visible" : ""}`}
        onClick={this.closeClick}
      >
      

        <CloseLink onCloseClick={onClose} />
        <Link to="/">Home</Link>
        {/* {isAdmin && <Link to="/new-post">New Post</Link>} */}
      </div>
    );
  }
}
