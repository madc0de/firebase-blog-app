import * as React from "react";
import { connect } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { Link, Route, Switch } from "react-router-dom";
import { PostEditSection } from "./PostEditSection";
import { PostListSection } from "./PostListSection";

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
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/admin">Content</Link>
            </li>
            <li>
              <Link to="/admin/post-edit">New Post</Link>
            </li>
          </ul>
        </div>
        <div className="admin-section-content">
          <Switch>
            <Route
              path="/admin/post-edit/"
              render={props => {
                return <PostEditSection {...props} />;
              }}
            />
            <Route path="/admin" component={PostListSection} />
          </Switch>
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

export const AdminSection = connect(mapStateToProps)(_AdminSection);
