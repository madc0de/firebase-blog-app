import * as React from "react";
import { Link } from "react-router-dom";
import { IPost, IPostData, IAuthState } from "../../interface";
import { formateDateIf, formatDateTimeIf } from "../../utils/dateUtil";

interface PostMetaProps {
  post: IPost
  authState: IAuthState
}

const PostMeta: React.SFC<PostMetaProps> = ({ post, authState }) => {  
  const postId = Object.keys(post)[0];
  const postData = post[postId] as IPostData;
  const canEdit = authState.authenticated && authState.authUser.uid === postData.userId

  const date =
    postData.status === "published"
      ? formateDateIf(postData.publish_date as number)
      : formatDateTimeIf(postData.updated_date as number);

  return (
    <div className="post-meta">
      {postData.photoUrl && (
        <span className="photo">
          <img src={postData.photoUrl} />
        </span>
      )}
      <span className="status">{status}</span>
      <span className="date"> {date}</span>
      {}

      {canEdit && <Link to={`/edit-post/${postId}`}>Edit</Link>}
    </div>
  );
};

export default PostMeta;
