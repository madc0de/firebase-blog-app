import * as React from "react";
import PostMeta from "../layout/PostMeta";
import { IPost, IPostData, IAuthState } from "../../interface";
import { Link } from "react-router-dom";

export interface PostExcerptProps {
  post: IPost;
  authState: IAuthState;
}

export default function PostExcerpt(props: PostExcerptProps) {
  const { post, authState } = props;
  const postId = Object.keys(post)[0];
  const postData = post[postId] as IPostData;
  const abbreviatedBodyText = postData.excerpt

  return (
    <article className="post-excerpt">
      <h2>
        <Link to={`/post/${postData.slug || postId}`}>{postData.title}</Link>
      </h2>
      <div className="body">{abbreviatedBodyText}</div>
      <PostMeta post={post} authState={authState} />
    </article>
  );
}
