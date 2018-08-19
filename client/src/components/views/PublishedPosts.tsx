import * as React from "react";
import { Header, PageContent } from '../layout';
import PostExcerpts from '../post/PostExcerpts'
import { connect } from "react-redux";
import {  postActions } from '../../store/actions'
import { PostDocument } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";

interface MappedDispatchProps {
  loadPublishedPosts(): void
}

interface Props extends MappedDispatchProps {
  posts: PostDocument[]
  authState: AuthState
}

class PublishedPosts extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.loadPublishedPosts()
  }

  render() {
    const { authState, posts } = this.props

    return (
      <div>
      <Header />
      <PageContent>
        <PostExcerpts posts={posts} filterBy={'published'} authState={authState} />
      </PageContent>
    </div>
    ) 
  }
}

const mapStateToProps = (state: AppState) => ({
  posts: state.postsState.posts,
  authState: state.authState
})

const mapDispatchToProps = (dispatch: any): MappedDispatchProps => ({
  loadPublishedPosts: () => dispatch(postActions.asyncGetPublishedPostsAction())
})


const _PublisedPosts = connect(mapStateToProps, mapDispatchToProps)(PublishedPosts)

export default _PublisedPosts
