import { Dispatch } from 'redux';
import { getAllUserPosts } from '../../../data/Posts'
import { PostDocument } from '../../../interface/PostData';
import { ReduxAction } from '../../../interface/ReduxAction';
import { actionType } from '..';
import { GetStateFn } from '../../../interface/GetStateFn';
import { getPublishedPosts, getRecentlyUpdatedPosts } from '../../../data/Posts'
import { PostBodyData } from 'src/interface/PostBodyData';

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

export const loadPublishedPostsAction = () => async (
  dispatch: Dispatch
) => {
  try {
    const posts = await getPublishedPosts(undefined, 10) // hard coded for now
    posts.forEach(post => dispatch(postLoaded(post)))
  } catch(err) {
    return err
  }
}

export const loadRecentlyUpdatedPostsAction = () => async (
  dispatch: Dispatch
) => {
  try {
    const posts = await getRecentlyUpdatedPosts(undefined, 50) // hard coded for now
    dispatch(postsLoaded(posts))
  } catch(err) {
    return err
  }
}

export const postLoaded = (post: PostDocument): ReduxAction<PostDocument> => ({
  type: actionType.post_loaded,
  payload: post
})

export const postsLoaded = (posts: PostDocument[]): ReduxAction<PostDocument[]> => ({
  type: actionType.posts_loaded,
  payload: posts
})

export const postBodyLoadedAction  = (postBody: PostBodyData): ReduxAction<PostBodyData>=> ({
  type: actionType.postbody_loaded,
  payload: postBody
});

export const postModifiedAction = (
  post: PostDocument
): ReduxAction<PostDocument> => ({
  type: actionType.post_modified,
  payload: post
});

export const postRemovedAction = (
  postId: string
): ReduxAction<PostDocument | string> => ({
  type: actionType.post_removed,
  payload: postId
});
