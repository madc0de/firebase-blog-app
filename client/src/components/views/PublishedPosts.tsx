import * as React from "react";
import { Header, PostContent } from "../layout";
import PostExcerpts from "../post/PostExcerpts";
import { connect } from "react-redux";
import * as postActions from "../../store/actions/post";
import { PostDocument } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface MappedDispatchProps {
  loadPublishedPosts(): void;
}

interface Props extends MappedDispatchProps {
  posts: PostDocument[];
  authState: AuthState;
}

class PublishedPosts extends React.Component<Props, {}> {
  componentDidMount() {
    this.props.loadPublishedPosts();
  }
  
  render() {
    const { authState, posts } = this.props;

    return (
      <div className="full-height">
        <Header />
        <PostContent>
          <PostExcerpts
            posts={posts}
            filterBy={"published"}
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
  loadPublishedPosts: () => dispatch(postActions.loadPublishedPostsAction())
});

const _PublisedPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(PublishedPosts);

export default _PublisedPosts;
