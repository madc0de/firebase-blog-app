import * as React from "react";
import PostMeta from "../layout/PostMeta";
import * as mapUtil from "../../utils/mapUtil";
import { PostDocument, PostData } from "../../interface/PostData";
import { AuthState } from "../../interface/AuthState";
import MarkdownViewer from "../MarkdownViewer";

interface PostProps {
  post: PostDocument;
  authState: AuthState;
}

const Post: React.SFC<PostProps> = props => {
  const { post, authState } = props;
  const postData = mapUtil.getValue(post) as PostData;

  return (
    <div className="post">
      <div className="post-header">
        <h1>{postData.title}</h1>
        <PostMeta post={post} authState={authState} />
      </div>
      <div className="post-body post-body-view">
        <MarkdownViewer markdown={postData.body} />
      </div>
    </div>
  );
};

export default Post;
