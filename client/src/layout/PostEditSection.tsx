import * as React from "react";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";
import { Route } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import PostFormWrapper from "../components/post-edit/PostFormWrapper";
import { PostFormState } from "src/interface/PostFormState";

// import PrivateRoute from "../components/route/PrivateRoute";

interface StateProps {
  authState: AuthState;
  postFormState: PostFormState;
}
interface Props extends StateProps, RouteComponentProps<any> {}

class _PostEditSection extends React.Component<Props, any> {
  render() {

    const { postFormState  } = this.props

    return (
      <React.Fragment>
        <Route
          exact
          path="/admin/post-edit/"
          render={props => {
            const postId = postFormState.postId
            return <PostFormWrapper key={postId} postId={postId} {...props} />;
          }}
        />
        <Route
          exact
          path="/admin/post-edit/:postId"
          render={(props: any) => {
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
    authState: state.authState,
    postFormState: state.postFormState
  };
};

export const PostEditSection = connect(mapStateToProps)(_PostEditSection);
