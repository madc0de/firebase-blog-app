import { AppInitState } from "./AppInitState";
import { BlogMetaData } from "./BlogMetaData";
import { AuthState } from "./AuthState";
import { PostsState } from "./PostState";
import { UsersState } from "./UserState";
import { SelectedPostState } from "./SelectedPostState";
import { PostFormState } from "./PostFormState";
import { FormReducer } from "redux-form";

export interface AppState {
  appInitState: AppInitState;
  metaDataState: BlogMetaData;
  authState: AuthState;
  postsState: PostsState;
  usersState: UsersState;
  selectedPostState: SelectedPostState;
  postFormState: PostFormState;
  form: FormReducer | Object;
}
