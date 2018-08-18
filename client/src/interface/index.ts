import { FormReducer } from "redux-form";

export interface IBlogSettings {
  blog_title: string;
  blog_description: string;
  blog_background_cover_url: string;
  loaded: boolean;
}

export type UserRole = "admin" | "contributor";
export interface IRole {
  [rolename: string]: boolean;
}

export interface IUserData {
  uid?: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  roles?: IRole;
}

export interface IMetaData {
  post_count: number;
  user_count: number;
}

export interface IUser extends IDocument<IUserData> {
  [userId: string]: IUserData;
}

export interface IUsersState {
  users: IUser[];
}

export type PostStatus = "draft" | "published";

type Millisecons = number;

export interface IPostData {
  userId?: string;
  photoUrl?: string;

  title: string;
  body: string;
  excerpt: string;
  slug?: string;

  created_date?: Millisecons;
  updated_date?: Millisecons;
  status: PostStatus;
  publish_date: Millisecons;
  pinned?: boolean;
}

export interface IPostFormValues extends IPostData {
  postId: string;
  publish_date_string: string;
}

export interface IDocument<T> {
  [documentId: string]: T;
}

export interface IPost extends IDocument<IPostData> {
  [documentId: string]: IPostData;
}

export interface IPostBody {
  postId: string;
  userId?: string;
  body: string;
}

export interface IAppInitState {
  initialized: boolean | undefined;
}

export interface IAuthState {
  authenticated: boolean;
  isAdmin: boolean;
  authUser: IUserData;
}

export interface IPostsState {
  posts: IPost[];
}

export type ILoadingStatus =
  | "init"
  | "loading"
  | "loaded"
  | "not-found"
  | "error";

export type ISubmitStatus = "" | "started" | "saved" | "error";

export interface ILoadingState {
  status: ILoadingStatus;
  error: string;
}

export interface IPostViewState {
  loadingStatus: ILoadingStatus;
  slugOrID: string | undefined;
  post?: IPost;
  error: string;
}

export interface IPostFormState {
  loadingStatus: ILoadingStatus;
  submitStatus: ISubmitStatus;
  postId: string | undefined;
  formValues?: IPostFormValues;
  error: string;
}

export interface IAppState {
  appInitState: IAppInitState;
  blogSettingsState: IBlogSettings;
  metaDataState: IMetaData;
  authState: IAuthState;
  postsState: IPostsState;
  usersState: IUsersState;
  postViewState: IPostViewState;
  postFormState: IPostFormState;
  form: FormReducer | Object;
}

export interface IAction<T> {
  type: string;
  payload: T;
}

export type PostExcerptFilter = "published" | "draft" | "recent";

export interface IGetState {
  (): IAppState;
}
