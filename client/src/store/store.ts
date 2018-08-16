import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  Reducer
} from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { IAppState, IAction } from "../interface";

// reducers
import appInitReducer from "./reduers/appInitReducer";
import blogSettingReducer from "./reduers/blogSettingsReducer";
import postsStateReducer from "./reduers/postReducer";
import authStateReducer from "./reduers/authStateReducer";
import usersStateReducer from "./reduers/usersReducer";
import postViewReducer from "./reduers/postViewReducer";
import postFormReducer from "./reduers/postFormReducer";

const rootReducer: Reducer<IAppState, IAction<any>> = combineReducers({
  appInitState: appInitReducer,
  blogSettingsState: blogSettingReducer,
  postsState: postsStateReducer,
  authState: authStateReducer,
  usersState: usersStateReducer,
  postViewState: postViewReducer,
  postFormState: postFormReducer,
  form: formReducer
});

export type BlogStore = Store<IAppState>;

export function initStore(cb: (store: BlogStore) => void) {
  let devtools: any = window["devToolsExtension"]
    ? window["devToolsExtension"]()
    : (f: any) => f;
  let middleware = applyMiddleware(thunk);
  const store: any = middleware(devtools(createStore))(rootReducer);

  cb(store);
}
