import { AnyAction } from "redux";
import { FormReducer } from "redux-form";

export  interface IBlogSetting {
  blog_title: string
  blog_description: string
  blog_background_cover_url: string
}

export interface IUser {
  uid?: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  authenticated?: boolean;
}

export interface IUsersState {
  users: IUser[];
}

export type PostStatus = "draft" | "published"

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
  authUser: IUser;
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
  status: ILoadingStatus
  error: string
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
  blogSettingState: IBlogSetting;
  authState: IAuthState;
  postsState: IPostsState;
  usersState: IUsersState;
  postViewState: IPostViewState;
  postFormState: IPostFormState;
  form: FormReducer | Object;
}

export interface IAction<T> extends AnyAction {
  type: string;
  payload: T;
}

export type PostExcerptFilter = "published" | "draft" | "recent";

export interface IGetState {
  (): IAppState;
}
