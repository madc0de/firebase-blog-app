import { Dispatch } from 'redux';
import { getPostTitles } from '../../../data/PostTitles'
import { PostTitleDocument } from '../../../interface/PostTitleData';
import { ReduxAction } from '../../../interface/ReduxAction';
import { actionType } from '..';
import { GetStateFn } from '../../../interface/GetStateFn';

export const loadPostTitles = (userId: string): any=> async (
  dispatch: Dispatch,
  getState: GetStateFn
) => {
  try {
    const posts = await getPostTitles(userId)
    return dispatch(postTitlesLoaded(posts))
  } catch(err) {
    return err
  }
}

export const postTitlesLoaded = (docs: PostTitleDocument[]): ReduxAction<PostTitleDocument[]> => ({
  type: actionType.posttitle_loaded,
  payload: docs
})