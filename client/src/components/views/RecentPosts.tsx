import * as React from "react";
import { Header, PageContent } from "../layout";
import PostExcerpts from "../post/PostExcerpts";
import { connect } from "react-redux";
import { IAppState, IAuthState, IPost } from "../../interface";
import { postActions } from "../../store/actions";

interface MappedDispatchProps {
  loadRencenltyUpdatedPosts(): void;
}

interface Props extends MappedDispatchProps {
  posts: IPost[];
  authState: IAuthState;
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
        <PageContent>
          <PostExcerpts
            posts={posts}
            filterBy={"recent"}
            authState={authState}
          />
        </PageContent>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  posts: state.postsState.posts,
  authState: state.authState
});

const mapDispatchToProps = (dispatch: any): MappedDispatchProps => ({
  loadRencenltyUpdatedPosts: () => dispatch(postActions.asyncGetRecentlyUpdatedPosts())
});

const _PublisedPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentPosts);

export default _PublisedPosts;
