import * as React from "react";
// import { Dispatch } from "redux";
import { connect, DispatchProp } from "react-redux";
import { IAppState, IPostViewState, IPost, IAuthState } from "../../interface";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { postViewActions } from "../../store/actions";
import Header from "../layout/Header";
import PageContent from "../layout/PageContent";
import Loading from "../layout/Loading";
import Post from "../post/Post";
import PostNotFound from "../post/PostNotFound";

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
  posts: IPost[];
  postViewState: IPostViewState;
  authState: IAuthState;
}

class PostView extends React.Component<
  PostViewProps & DispatchActionProps,
  IPostViewState
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
    const { loadingStatus, post, error } = this.props.postViewState;

    if (loadingStatus === "init") {
      return <div />;
    }
    if (loadingStatus === "loading") {
      return;
      <PageContent>
        <Loading>Loading Post...</Loading>;
      </PageContent>;
    }
    if (loadingStatus === "not-found") {
      return <PostNotFound />;
    }
    if (loadingStatus === "error") {
      return (
        <PageContent>
          <h4>Error loading post</h4>
          <div>{error}</div>
        </PageContent>
      );
    }
    return (
      <PageContent>
        <Post post={post as IPost} authState={this.props.authState} />
      </PageContent>
    )
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

const mapStateToProps = (state: IAppState) => {
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
