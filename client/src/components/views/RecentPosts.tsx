import * as React from "react";
import { Header, PostContent } from "../layout";
import PostExcerpts from "../post/PostExcerpts";
import { connect } from "react-redux";
import { postActions } from "../../store/actions";
import { PostDocument } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface MappedDispatchProps {
  loadRencenltyUpdatedPosts(): void;
}

interface Props extends MappedDispatchProps {
  posts: PostDocument[];
  authState: AuthState;
}

class RecentPosts extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.loadRencenltyUpdatedPosts();
  }

  render() {
    const { authState, posts } = this.props;

    return (
      <div>
        <Header />
        <PostContent>
          <PostExcerpts
            posts={posts}
            filterBy={"recent"}
            authState={authState}
          />
        </PostContent>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  posts: state.postsState.posts,
  authState: state.authState
});

const mapDispatchToProps = (dispatch: any): MappedDispatchProps => ({
  loadRencenltyUpdatedPosts: () => dispatch(postActions.loadRecentlyUpdatedPostsAction())
});

const _PublisedPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentPosts);

export default _PublisedPosts;
