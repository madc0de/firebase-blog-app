import { IAuthState, IUser, IUserData, IAction } from "../../interface";
import * as actionType from "../actions/actionType";
import { initial_AuthState } from "../../store/initialState";
import { mapUtil } from "../../utils";

export const authReducer = (
  state: IAuthState,
  action: IAction<IUserData | IUser>
) => {
  state = state ? state : initial_AuthState;

  switch (action.type) {
    case actionType.user_authenticated:
     return handle_user_authenticated(state, action as IAction<IUser>);
    case actionType.user_signed_out:
      return handle_user_signed_out();
    case actionType.user_loaded:
      return handle_user_loaded(state, action as IAction<IUser>);
    default:
      return state;
  }
};

const handle_user_authenticated = (
  state: IAuthState,
  action: IAction<IUser>
): IAuthState => {
  const user = action.payload as IUser
  const userId = mapUtil.getMapKey(user)
  const userData = mapUtil.getMapValue(user) as IUserData
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

function handle_user_loaded(state: IAuthState, action: IAction<IUser>): IAuthState {
  const userId = mapUtil.getMapKey(action.payload);
  const userData = mapUtil.getMapValue(action.payload) as IUserData;
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
