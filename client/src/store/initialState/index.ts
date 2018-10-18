import { BlogSettingData } from "../../interface/BlogSettingData";
import { BlogMetaData } from "../../interface/BlogMetaData";
import { UserData } from "../../interface/UserData";
import { AuthState } from "../../interface/AuthState";
import { PostsState } from "../../interface/PostState";
import { UsersState } from "../../interface/UserState";
import { PostData } from "../../interface/PostData";
import { SelectedPostState } from "../../interface/SelectedPostState";
import { PostFormValues } from "../../interface/PostFormValues";
import { PostFormState } from "../../interface/PostFormState";

export const initail_BlogSetting: BlogSettingData =  {
  blog_title: '',
  blog_description: '',
  blog_background_cover_url: '',
  loaded: false
}

export const initial_MetaData: BlogMetaData = {
  post_count: 0,
  user_count: 0
}

export const initial_UserData: UserData = {
  email: '',
  displayName: '',
  photoUrl: '',
  roles: {}
}

export const initial_AuthState: AuthState = {
  authenticated: false,
  isAdmin: false,
  authUserId: '',
  authUserData: initial_UserData,
  error: ''
};

export const initial_PostsState: PostsState = {
  posts: []
};

export const initial_UsersState: UsersState = {
  users: []
};

export const initial_PostData: PostData = {
  userId: '',
  photoUrl: '',
  title: '',
  body: '',
  excerpt: '',
  status: 'draft',
  publish_date: 0,
  slug: '',
  created_date: 0
};

export const initial_SelectedPostState: SelectedPostState = {
  loadingStatus: 'init',
  error: '',
  post: undefined
};

export const initial_PostFormValuesState: PostFormValues = {
  ...initial_PostData,
  postId: '',
  publish_date_string: '',
  userId: '',
  photoUrl: ''
};

export const initial_PostFormState: PostFormState = {
  loadingStatus: 'init',
  submitStatus: '',
  postId: '',
  formValues: initial_PostFormValuesState,
  error: ''
};

