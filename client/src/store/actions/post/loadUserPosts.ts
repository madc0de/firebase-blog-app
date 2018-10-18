import { Dispatch } from 'redux';
import { getAllUserPosts } from '../../../data/Posts'
import { PostDocument } from '../../../interface/PostData';
import { ReduxAction } from '../../../interface/ReduxAction';
import { actionType } from '..';
import { GetStateFn } from '../../../interface/GetStateFn';

export const loadUserPosts = (userId: string): any=> async (
  dispatch: Dispatch,
  getState: GetStateFn
) => {
  try {
    const posts = await getAllUserPosts(userId)
    return dispatch(postsLoaded(posts))
  } catch(err) {
    console.log(err)
    return err
  }
}

export const postsLoaded = (docs: PostDocument[]): ReduxAction<PostDocument[]> => ({
  type: actionType.posts_loaded,
  payload: docs
})