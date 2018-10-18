import * as React from "react";
import { Header, PostContent } from "../layout";
import PostExcerpts from "../post/PostExcerpts";
import { connect } from "react-redux";
import * as postActions from "../../store/actions/post";
import { PostDocument } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";
import { PostExcerptFilter } from "src/interface/PostExcerptFilter";

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
