import * as React from "react";
import { connect } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import PrivateRoute from "../components/route/PrivateRoute";
import PostFormView from "../components/views/PostFormView";
import { Link } from "react-router-dom";

interface StateProps {
  authState: AuthState;
}

class _AdminSection extends React.Component<StateProps, {}> {
  render() {
    const { authState } = this.props;
    return (
      <div className="admin-section">
        <div className="admin-section-nav">
          <ul>
            <li>
              <Link to="admin/content">Content</Link>
            </li>
            <li>
              <Link to="admin/new-post">New post</Link>
            </li>
          </ul>
        </div>
        <div className="admin-section-content">
          <PrivateRoute
            path="/admin/new-post"
            authState={authState}
            component={PostFormView}
          />
          <PrivateRoute
            path="/admin/edit-post/:postId"
            authState={authState}
            component={PostFormView}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  console.log("admin-section map state to props");
  return {
    authState: state.authState
  };
};

export const AdminSection = connect(mapStateToProps)(_AdminSection);
