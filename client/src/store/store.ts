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

import * as  reducers from './reducers'


const rootReducer: Reducer<IAppState, IAction<any>> = combineReducers({
  appInitState: reducers.appInitReducer,
  blogSettingsState: reducers.blogSettingsReducer,
  metaDataState: reducers.metaDataReducer,
  postsState: reducers.postReducer,
  authState: reducers.authReducer,
  usersState: reducers.userReducer,
  postViewState: reducers.postViewReducer,
  postFormState: reducers.postFormReducer,
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
