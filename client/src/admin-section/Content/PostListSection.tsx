import * as React from "react";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PostView from "../../components/post/PostView";
import { PostList } from "src/components/post/PostList";

// import PrivateRoute from "../components/route/PrivateRoute";

interface StateProps {
  authState: AuthState;
}
interface Props extends StateProps, RouteComponentProps<any> {}

class _PostListSection extends React.Component<Props, any> {
  render() {
    return (
      <div className="post-list-section">
        <div className="post-list-section--list">
          <PostList />
        </div>
        <div className="post-list-section--post">
          <Route
            exact
            path="/admin/post-list/:slugOrId"
            render={props => {
              const { slugOrId } = props.match.params;
              return (
                <PostView {...props} slugOrId={slugOrId} hideHeader={true} />
              );
            }}
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

export const PostListSection = withRouter(
  connect(mapStateToProps)(_PostListSection)
);
