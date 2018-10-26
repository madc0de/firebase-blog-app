import * as React from "react";
import { connect } from "react-redux";
import { PostExcerptFilter } from "src/interface/PostExcerptFilter";
import { PostDocument } from "src/interface/PostData";
import { AuthState } from "src/interface/AuthState";
import { PostContent, Header } from "src/components/layout";
import { AppState } from "src/interface/AppState";
import PostExcerpts from "src/components/post/PostExcerpts";
import { postActions } from "src/store/actions";

interface DispatchProps {
  loadPublishedPosts(): void
  loadRecentlyUpdatedPosts(): void
}

interface MappedProps {
  posts: PostDocument[];
  authState: AuthState;
}

interface Props extends MappedProps, DispatchProps {
  filter: PostExcerptFilter;
}

class Posts extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.filter === "published") {
      this.props.loadPublishedPosts();
    } else {
      this.props.loadRecentlyUpdatedPosts()
    }
  }

  render() {
    const { authState, posts, filter } = this.props;

    return (
      <div className="full-height">
        <Header />
        <PostContent>
          <PostExcerpts
            posts={posts}
            filterBy={filter}
            authState={authState}
          />
        </PostContent>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): MappedProps => {
  return {
    posts: state.postsState.posts,
    authState: state.authState
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  loadPublishedPosts: () => dispatch(postActions.loadPublishedPostsAction()),
  loadRecentlyUpdatedPosts: () => dispatch(postActions.loadRecentlyUpdatedPostsAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
