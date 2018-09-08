import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import PrivateRoute from "../components/route/PrivateRoute";
import PostFormView from "../components/views/PostFormView";
import { Link } from "react-router-dom";
import { loadPostTitles } from "../store/actions/post";

interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  loadPostTitles(userId: string): void
}

class _AdminSection extends React.Component<StateProps & DispatchProps, {}> {

  componentDidMount() {
    if (this.props.authState && this.props.authState.authUserId) {
      this.props.loadPostTitles(this.props.authState.authUserId)
    }
  }

  render() {
    const { authState } = this.props;
    return (
      <div className="admin-section">
        <div className="admin-section-nav">
          <ul>
            <li>
              <Link to="/admin/content">Content</Link>
            </li>
            <li>
              <Link to="/admin/new-post">New post</Link>
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
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadPostTitles(userId: string) { 
    dispatch(loadPostTitles(userId))
  }
})

export const AdminSection = connect(mapStateToProps, mapDispatchToProps)(_AdminSection);
