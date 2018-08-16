import { IUsersState, IUser, IAction } from "../../interface";
import { initial_UsersState } from "../../store/initialState";
import * as actionType from "../actions/actionType";
import { mapUtil } from '../../utils';

const usersStateReduder = (
  state: IUsersState,
  action: IAction<IUser>
): IUsersState => {
  state = state ? state : initial_UsersState;

  switch (action.type) {
    case actionType.user_loaded: {
      return handle_user_loaded(state, action.payload);
    }
    default:
      return state;
  }
};

function handle_user_loaded(
  state: IUsersState,
  user: IUser
): IUsersState {
  const userId = mapUtil.getMapKey(user)
  const index = state.users.findIndex(user => mapUtil.getMapKey(user) === userId);

  if (index < 0) {
    return {
      ...state,
      users: [...state.users, user]
    };
  }

  return {
    ...state,
    users: [
      ...state.users.slice(0, index),
      user,
      ...state.users.slice(index + 1)
    ]
  };
}

export default usersStateReduder;
