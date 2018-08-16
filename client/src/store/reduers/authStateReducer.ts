import { IAuthState, IUser, IUserData, IAction } from "../../interface";
import * as actionType from "../actions/actionType";
import { initial_AuthState } from "../../store/initialState";
import { mapUtil } from "../../utils";

const authStateReducer = (
  state: IAuthState,
  action: IAction<IUserData | IUser>
) => {
  state = state ? state : initial_AuthState;

  switch (action.type) {
    case actionType.user_authenticated:
     return handle_user_authenticated(state, action as IAction<IUserData>);
    case actionType.user_signed_out:
      return handle_user_signed_out();
    case actionType.user_loaded:
      return handle_user_loaded(state, action as IAction<IUser>);
    default:
      return state;
  }
};

export default authStateReducer;

const handle_user_authenticated = (
  state: IAuthState,
  action: IAction<IUserData>
): IAuthState => {
  return {
    ...initial_AuthState,
    authenticated: true,
    authUser: action.payload as IUserData
  };
};

function handle_user_signed_out() {
  const newState = { ...initial_AuthState };
  return newState;
}

function handle_user_loaded(state: IAuthState, action: IAction<IUser>) {
  const userId = mapUtil.getMapKey(action.payload);
  const userData = mapUtil.getMapValue(action.payload) as IUserData;
  if (state.authUser.uid === userId) {
    return {
      ...state,
      authUser: {
        ...state.authUser,
        roles: userData.roles
      }
    };
  }
  return state;
}
