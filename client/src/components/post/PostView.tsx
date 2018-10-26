import * as React from "react";
// import { Dispatch } from "redux";
import { connect, DispatchProp } from "react-redux";
import { postViewActions } from "../../store/actions";
import Header from "../layout/Header";
import PostContent from "../layout/PostContent";
import Loading from "../layout/Loading";
import Post from "./Post";
import PostNotFound from "./PostNotFound";
import { PostDocument } from "../../interface/PostData";
import { SelectedPostState } from "../../interface/SelectedPostState";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface DispatchProps {
  loadPost(slugOrId: string): void;
}

interface MappedStateProps {
  posts: PostDocument[];
  selectedPostState: SelectedPostState;
  authState: AuthState;
}

export interface Props {
  hideHeader: boolean;
  slugOrId: string;
}

class PostView extends React.Component<
  Props & DispatchProps & MappedStateProps,
  DispatchProp<any>,
  SelectedPostState
> {
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
    const { loadingStatus, post } = this.props.selectedPostState;

    switch (loadingStatus) {
      case "": return <React.Fragment></React.Fragment>
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
      <React.Fragment>
        {!this.props.hideHeader && <Header />}
        {this.getContent()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState): MappedStateProps => {
  return {
    posts: state.postsState.posts,
    selectedPostState: state.selectedPostState,
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadPost: (slugOrId: string) =>
    dispatch(postViewActions.loadPosttAction(slugOrId))
});

const _PostPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView);

export default _PostPage;
