import * as React from "react";
import { PostList } from "./PostList";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PostView from "../components/views/PostView";
import PostFormView from "../components/views/PostFormView";

// import PrivateRoute from "../components/route/PrivateRoute";

interface StateProps {
  authState: AuthState;
}
interface Props extends StateProps, RouteComponentProps<any> {}

class _PostAdminSection extends React.Component<Props, any> {
  render() {
    return (
      <div className="post-admin-section">
        <div className="post-admin-section--list">
          <PostList />
        </div>
        <div className="post-admin-section--post">
          <Switch>
          <Route
              exact
              path="/admin/post-create"
              render={props => {
                return <PostFormView postId={undefined} {...props} />;
              }}
            />
            <Route
              exact
              path="/admin/post-edit/:postId"
              render={props => {
                const { postId } = props.match.params; 
                return <PostFormView postId={postId} {...props} />;
              }}
            />
            <Route
              exact
              path="/admin/post/:slugOrId"
              render={props => {
                const { slugOrId } = props.match.params;
                return (
                  <PostView {...props} slugOrId={slugOrId} hideHeader={true} />
                );
              }}
            />
          </Switch>
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

export const PostAdminSection = withRouter(
  connect(mapStateToProps)(_PostAdminSection)
);
