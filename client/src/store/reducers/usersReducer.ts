import { initial_UsersState } from "../../store/initialState";
import * as actionType from "../actions/actionType";
import { mapUtil } from '../../utils';
import { UserDocument } from "../../interface/UserData";
import { UsersState } from "../../interface/UserState";
import { ReduxAction } from "../../interface/ReduxAction";

export const userReducer = (
  state: UsersState,
  action: ReduxAction<UserDocument>
): UsersState => {
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
  state: UsersState,
  user: UserDocument
): UsersState {
  const userId = mapUtil.getKey(user)
  const index = state.users.findIndex(user => mapUtil.getKey(user) === userId);

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
