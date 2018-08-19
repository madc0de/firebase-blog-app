import * as React from "react";
import PostMeta from "../layout/PostMeta";
import { Link } from "react-router-dom";
import { PostDocument, PostData } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";

export interface PostExcerptProps {
  post: PostDocument;
  authState: AuthState;
}

export default function PostExcerpt(props: PostExcerptProps) {
  const { post, authState } = props;
  const postId = Object.keys(post)[0];
  const postData = post[postId] as PostData;
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
