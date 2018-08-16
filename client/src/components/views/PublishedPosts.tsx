import * as React from "react";
import { Header, PageContent } from '../layout';
import PostExcerpts from '../post/PostExcerpts'
import { connect } from "react-redux";
import { IAppState, IAuthState, IPost } from "../../interface";
import {  postActions } from '../../store/actions'

interface MappedDispatchProps {
  loadPublishedPosts(): void
}

interface Props extends MappedDispatchProps {
  posts: IPost[]
  authState: IAuthState
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

const mapStateToProps = (state: IAppState) => ({
  posts: state.postsState.posts,
  authState: state.authState
})

const mapDispatchToProps = (dispatch: any): MappedDispatchProps => ({
  loadPublishedPosts: () => dispatch(postActions.asyncGetPublishedPostsAction())
})


const _PublisedPosts = connect(mapStateToProps, mapDispatchToProps)(PublishedPosts)

export default _PublisedPosts
