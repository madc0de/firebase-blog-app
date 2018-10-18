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
import { SelectedPostState } from "../../interface/SelectedPostState";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface RouteParamProps {
  slugOrId: string;
}

interface DispatchProps {
  setPostViewSlugOrId(slugOrId: string): void;
  loading(): void;
  loadPost(slugOrId: string): void;
}

interface StateProps {
  posts: PostDocument[];
  postViewState: SelectedPostState;
  authState: AuthState;
  slugOrPostId: string
}

export interface Props
  extends StateProps, RouteComponentProps<RouteParamProps>,
    DispatchProp<any> {    
  hideHeader: boolean
  slugOrId: string
}

class PostView extends React.Component<
  Props & DispatchProps,
  SelectedPostState
> {
  constructor(props: Props & DispatchProps) {
    super(props);
  }

  componentDidMount() {
    if (this.props.slugOrId) {
      this.props.loadPost(this.props.slugOrId);
    }
  }
  
  componentDidUpdate(prevProps: Props) {
    if (prevProps.slugOrId !== this.props.slugOrId) {
      this.props.loadPost(this.props.slugOrId);
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
  loadPost: (slugOrId: string) =>
    dispatch(postViewActions.asyncPostViewLoadPostAction(slugOrId))
});

const _PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);

export default withRouter(_PostPage);
