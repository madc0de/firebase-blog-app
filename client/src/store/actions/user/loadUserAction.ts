import { Dispatch } from 'redux';
import * as Users from '../../../data/Users'
import { userLoadedAction } from './userLoadedAction';
import { IGetState } from '../../../interface';

export const loadUserAccount = (userId: string) => async (
  dispatch: Dispatch,
  getState: IGetState
) => {
  try {
    const user = await Users.getUser(userId)
    if (user) {
      dispatch(userLoadedAction(user))
    }
    return undefined
  } catch(err) {
    return err
  }
}
