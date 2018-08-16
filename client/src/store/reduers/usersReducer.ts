import { IUsersState, IUser, IAction } from "../../interface";
import { initial_UsersState } from "../../store/initialState";
import * as actionType from "../actions/actionType";

const usersStateReduder = (
  state: IUsersState,
  action: IAction<IUser>
): IUsersState => {
  state = state ? state : initial_UsersState;

  switch (action.type) {
    case actionType.user_added: {
      return apply_user_to_state(state, action.payload);
    }
    default:
      return state;
  }
};

function apply_user_to_state(
  state: IUsersState,
  incommingUser: IUser
): IUsersState {
  const index = state.users.findIndex(user => user.uid === incommingUser.uid);

  if (index < 0) {
    return {
      ...state,
      users: [...state.users, incommingUser]
    };
  }

  return {
    ...state,
    users: [
      ...state.users.slice(0, index),
      incommingUser,
      ...state.users.slice(index + 1)
    ]
  };
}

export default usersStateReduder;
