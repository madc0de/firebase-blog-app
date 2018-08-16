import * as React from "react";
import PostExcerpt from "./PostExcerpt";
import * as mapUtil from "../../utils/mapUtil";
import {
  IPost,
  IPostData,
  IAuthState,
  PostExcerptFilter
} from "../../interface";

export function comparePostPublishedDescending(
  postA: IPost,
  postB: IPost
): number {
  const date_a = (mapUtil.getMapValue(postA) as IPostData)
    .publish_date as number;
  const date_b = (mapUtil.getMapValue(postB) as IPostData)
    .publish_date as number;
  return date_a > date_b ? -1 : 1;
}

export function compareUpdatedDateDescending(
  postA: IPost,
  postB: IPost
): number {
  const date_a = (mapUtil.getMapValue(postA) as IPostData)
    .updated_date as number;
  const date_b = (mapUtil.getMapValue(postB) as IPostData)
    .updated_date as number;
  return date_a > date_b ? -1 : 1;
}

const filterPosts = (posts: IPost[], filterBy: PostExcerptFilter) => {
  if (filterBy === "published") {
    return posts.filter(
      post =>
        (mapUtil.getMapValue(post) as IPostData).status === filterBy
    );
  }

  return posts.sort(compareUpdatedDateDescending);
};

export interface PostExcerptsProps {
  filterBy: PostExcerptFilter;
  posts: IPost[];
  authState: IAuthState;
}
class PostExcerpts extends React.Component<PostExcerptsProps, any> {
  render() {
    const { authState, filterBy, posts } = this.props;
    const postExcerptItems = filterPosts(posts, filterBy).map((post, i) => (
      <PostExcerpt
        key={i}
        post={post}
        authState={authState}
      />
    ));

    return <section className="post-list">{postExcerptItems}</section>;
  }
}


export default PostExcerpts;
