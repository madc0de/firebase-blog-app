import * as actionType from "../actions/actionType";
import { initial_AuthState } from "../../store/initialState";
import { mapUtil } from "../../utils";
import { UserDocument, UserData } from "../../interface/UserData";
import { AuthState } from "../../interface/AuthState";
import { ReduxAction } from "../../interface/ReduxAction";

export const authReducer = (
  state: AuthState,
  action: ReduxAction<UserData | UserDocument>
) => {
  state = state ? state : initial_AuthState;

  switch (action.type) {
    case actionType.user_authenticated:
     return handle_user_authenticated(state, action as ReduxAction<UserDocument>);
    case actionType.user_signed_out:
      return handle_user_signed_out();
    case actionType.user_loaded:
      return handle_user_loaded(state, action as ReduxAction<UserDocument>);
    default:
      return state;
  }
};

const handle_user_authenticated = (
  state: AuthState,
  action: ReduxAction<UserDocument>
): AuthState => {
  const user = action.payload as UserDocument
  const userId = mapUtil.getKey(user)
  const userData = mapUtil.getValue(user) as UserData
  return {
    ...initial_AuthState,
    authenticated: true,
    authUserId: userId,
    authUserData: userData
  };
};

function handle_user_signed_out() {
  const newState = { ...initial_AuthState };
  return newState;
}

function handle_user_loaded(state: AuthState, action: ReduxAction<UserDocument>): AuthState {
  const userId = mapUtil.getKey(action.payload);
  const userData = mapUtil.getValue(action.payload) as UserData;
  if (state.authUserId === userId) {
    return {
      ...state,
      authUserData: {
        ...state.authUserData,
        roles: userData.roles
      },
      isAdmin: userData.roles && userData.roles.admin ? true : false
    };
  }
  return state;
}
