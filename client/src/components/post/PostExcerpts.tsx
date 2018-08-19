import * as React from "react";
import PostExcerpt from "./PostExcerpt";
import * as mapUtil from "../../utils/mapUtil";
import { PostData, PostDocument } from "../../interface/PostData";
import { PostExcerptFilter } from "../../interface/PostExcerptFilter";
import { AuthState } from "../../interface/AuthState";

export function comparePostPublishedDescending(
  postA: PostDocument,
  postB: PostDocument
): number {
  const date_a = (mapUtil.getValue(postA) as PostData)
    .publish_date as number;
  const date_b = (mapUtil.getValue(postB) as PostData)
    .publish_date as number;
  return date_a > date_b ? -1 : 1;
}

export function compareUpdatedDateDescending(
  postA: PostDocument,
  postB: PostDocument
): number {
  const date_a = (mapUtil.getValue(postA) as PostData)
    .updated_date as number;
  const date_b = (mapUtil.getValue(postB) as PostData)
    .updated_date as number;
  return date_a > date_b ? -1 : 1;
}

const filterPosts = (posts: PostDocument[], filterBy: PostExcerptFilter) => {
  if (filterBy === "published") {
    return posts.filter(
      post =>
        (mapUtil.getValue(post) as PostData).status === filterBy
    );
  }

  return posts.sort(compareUpdatedDateDescending);
};

export interface PostExcerptsProps {
  filterBy: PostExcerptFilter;
  posts: PostDocument[];
  authState: AuthState;
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
