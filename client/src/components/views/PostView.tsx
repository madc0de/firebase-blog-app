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
  slug: string;
}

interface DispatchActionProps {
  initView(): void;
  loading(): void;
  loadPost(slugOrId: string): void;
}

export interface PostViewProps
  extends RouteComponentProps<RouteParamProps>,
    DispatchProp<any> {
  posts: PostDocument[];
  postViewState: PostViewState;
  authState: AuthState;
}

class PostView extends React.Component<
  PostViewProps & DispatchActionProps,
  PostViewState
> {
  constructor(props: PostViewProps & DispatchActionProps) {
    super(props);

    props.initView();
  }

  componentDidUpdate(preProps: PostViewProps) {
    const { slug } = this.props.match.params;
    const { loadingStatus } = this.props.postViewState;

    if (loadingStatus === "init") {
      this.props.loadPost(slug);
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
        <Header />
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
  initView: () => dispatch(postViewActions.postViewSetStatusAction("init")),
  loadPost: (slugOrId: string) =>
    dispatch(postViewActions.asyncPostViewLoadPostAction(slugOrId))
});

const _PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);

export default withRouter(_PostPage);
