import * as React from "react";
import Markdown from "./Makrdown";
import PostMeta from "../layout/PostMeta";
import { IPost, IPostData, IAuthState } from "../../interface";
import * as mapUtil from "../../utils/mapUtil";

interface PostProps {
  post: IPost;
  authState: IAuthState;
}

const Post: React.SFC<PostProps> = props => {
  const { post, authState } = props;
  const postData = mapUtil.getMapValue(post) as IPostData;

  return (
    <div className="post">
      <div className="post-header">
        <h1>{postData.title}</h1>
        <PostMeta post={post} authState={authState} />
      </div>
      <div className="post-body">
        <Markdown text={postData.body} />
      </div>
    </div>
  );
};

export default Post;
