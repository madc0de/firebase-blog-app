import * as React from 'react';
import { AppState } from '../interface/AppState';
import { PostTitlesState } from '../interface/PostTitlesState';
import { connect } from 'react-redux';

interface StateProps {
  postTitlesState: PostTitlesState
}

export interface Props extends StateProps {
}

export default class _PostList extends React.Component<Props, any> {
  public render() {
    const { postTitlesState } = this.props

    return (
      <div className="post-list">
        {
          postTitlesState.postTitles.map(postTitle => {
            const key = Object.keys(postTitle)[0]
            const postDate = postTitle[key]
            return <div key={key}>{postDate.title}</div>
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  postTitlesState: state.postTitlesState
})

export const PostList = connect(mapStateToProps)(_PostList)
