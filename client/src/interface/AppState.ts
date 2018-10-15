import { AppInitState } from "./AppInitState";
import { BlogSettingData } from "./BlogSettingData";
import { BlogMetaData } from "./BlogMetaData";
import { AuthState } from "./AuthState";
import { PostsState } from "./PostState";
import { UsersState } from "./UserState";
import { PostViewState } from "./PostViewState";
import { PostFormState } from "./PostFormState";
import { FormReducer } from "redux-form";

export interface AppState {
  appInitState: AppInitState;
  blogSettingsState: BlogSettingData;
  metaDataState: BlogMetaData;
  authState: AuthState;
  postsState: PostsState;
  usersState: UsersState;
  postViewState: PostViewState;
  postFormState: PostFormState;
  form: FormReducer | Object;
}
