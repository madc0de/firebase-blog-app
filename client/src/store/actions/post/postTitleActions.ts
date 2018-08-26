import { Dispatch } from 'redux';
import { getPublishedPosts, getRecentlyUpdatedPosts } from '../../../data/Posts'
import { postLoadedAction } from './postLoadedAction';

export const loadPublishedPostsAction = () => async (
  dispatch: Dispatch
) => {
  try {
    const posts = await getPublishedPosts(undefined, 10) // hard coded for now
    posts.forEach(post => dispatch(postLoadedAction(post)))
  } catch(err) {
    return err
  }
}

export const loadRecentlyUpdatedPostsAction = () => async (
  dispatch: Dispatch
) => {
  try {
    const posts = await getRecentlyUpdatedPosts(undefined, 50) // hard coded for now
    posts.forEach(post => dispatch(postLoadedAction(post)))
  } catch(err) {
    return err
  }
}

