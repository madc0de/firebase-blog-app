import * as React from "react";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";
import { Route } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PostFormWrapper from "../components/post-edit/PostFormWrapper";

// import PrivateRoute from "../components/route/PrivateRoute";

interface StateProps {
  authState: AuthState;
}
interface Props extends StateProps, RouteComponentProps<any> {}

class _PostEditSection extends React.Component<Props, any> {
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/admin/post-edit/"
          render={props => {
            return <PostFormWrapper postId={undefined} {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/post-edit/:postId"
          render={props => {
            const { postId } = props.match.params;
            return <PostFormWrapper postId={postId} {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState
  };
};

export const PostEditSection = connect(mapStateToProps)(_PostEditSection)

