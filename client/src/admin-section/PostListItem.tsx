import * as React from "react";
import { PostTitleDocument } from "../interface/PostTitleData";

interface PostListItemProps {
  postTitle: PostTitleDocument
}

const PostListItem: React.SFC<PostListItemProps> = ({postTitle}) => {

  const key = Object.keys(postTitle)[0]
  const postTitleData = postTitle[key]

  return (
    <div className="post-list-item">
      <div className="title">{postTitleData.title}</div>
      <div className="meta">
        <div className="status">{postTitleData.status}</div>
      </div>
    </div>
  );
};

export default PostListItem;
