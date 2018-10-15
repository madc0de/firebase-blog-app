import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { Link } from "react-router-dom";
import { loadUserPosts } from "../store/actions/post";
import { PostAdminSection } from "./PostAdminSection";

interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  loadPostTitles(userId: string): void;
}

class _AdminSection extends React.Component<StateProps & DispatchProps, {}> {
  componentDidMount() {
    if (this.props.authState && this.props.authState.authUserId) {
      this.props.loadPostTitles(this.props.authState.authUserId);
    }
  }

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

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadPostTitles(userId: string) {
    dispatch(loadUserPosts(userId));
  }
});

export const AdminSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminSection);
