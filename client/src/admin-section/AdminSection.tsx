import * as React from "react";
import { connect } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { Link } from "react-router-dom";
import { PostAdminSection } from "./PostAdminSection";

interface MappedStateProps {
  authState: AuthState;
}

class _AdminSection extends React.Component<MappedStateProps, {}> {

  render() {
    return (
      <div className="admin-section">
        <div className="admin-section-nav">
          <ul>
            <li>
              <Link to="/admin/">Content</Link>
            </li>
            <li>
              <Link to="/admin/post/new">New post</Link>
            </li>
            <li>
              <Link to="/admin/post/other">Other</Link>
            </li>
          </ul>
        </div>
        <div className="admin-section-content">
            <PostAdminSection />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): MappedStateProps => {
  return {
    authState: state.authState
  };
};

export const AdminSection = connect(
  mapStateToProps
)(_AdminSection);
