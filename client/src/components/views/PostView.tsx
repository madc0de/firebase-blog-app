import * as React from "react";
// import { Dispatch } from "redux";
import { connect, DispatchProp } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { postViewActions } from "../../store/actions";
import Header from "../layout/Header";
import PostContent from "../layout/PostContent";
import Loading from "../layout/Loading";
import Post from "../post/Post";
import PostNotFound from "../post/PostNotFound";
import { PostDocument } from "../../interface/PostData";
import { PostViewState } from "../../interface/PostViewState";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface RouteParamProps {
  slugOrId: string;
}

interface DispatchActionProps {
  setPostViewSlugOrId(slugOrId: string): void;
  loading(): void;
  loadPost(slugOrId: string): void;
}

interface StateProps {
  posts: PostDocument[];
  postViewState: PostViewState;
  authState: AuthState;
  slugOrPostId: string
}

export interface PostViewProps
  extends StateProps, RouteComponentProps<RouteParamProps>,
    DispatchProp<any> {    
  hideHeader: boolean
}

class PostView extends React.Component<
  PostViewProps & DispatchActionProps,
  PostViewState
> {
  constructor(props: PostViewProps & DispatchActionProps) {
    super(props);
  }

  componentDidUpdate(preProps: PostViewProps) {
    const { slugOrId } = this.props.match.params;
    const { postViewState } = this.props;

    if (postViewState.slugOrID !== slugOrId) {
      this.props.setPostViewSlugOrId(slugOrId)
    }

    if (postViewState.loadingStatus === "init") {
      this.props.loadPost(slugOrId);
    }
  }

  getContent = () => {
    const { loadingStatus, post } = this.props.postViewState;

    switch (loadingStatus) {
      case "init":
        return <div />;
      case "loading":
        return (
          <PostContent>
            <Loading />
          </PostContent>
        );
      case "not-found":
        return <PostNotFound />;
      case "error":
        return (
          <PostContent>
            <h4>Error loading post</h4>
          </PostContent>
        );
      default:
        return (
          <PostContent>
            <Post
              post={post as PostDocument}
              authState={this.props.authState}
            />
          </PostContent>
        );
    }
  };

  render() {
    return (
      <div>
        {!this.props.hideHeader && <Header />}
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    posts: state.postsState.posts,
    postViewState: state.postViewState,
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  setPostViewSlugOrId: (slugOrId: string) => dispatch(postViewActions.postViewSetSlugOrId(slugOrId)),
  loadPost: (slugOrId: string) =>
    dispatch(postViewActions.asyncPostViewLoadPostAction(slugOrId))
});

const _PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);

export default withRouter(_PostPage);
