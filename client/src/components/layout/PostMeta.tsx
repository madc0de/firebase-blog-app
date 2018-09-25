import * as React from "react";
import { Link } from "react-router-dom";
import { formateDateIf, formatDateTimeIf } from "../../utils/dateUtil";
import { AuthState } from "../../interface/AuthState";
import { PostData, PostDocument } from "../../interface/PostData";

interface PostMetaProps {
  post: PostDocument
  authState: AuthState
}

const PostMeta: React.SFC<PostMetaProps> = ({ post, authState }) => {  
  const postId = Object.keys(post)[0];
  const postData = post[postId] as PostData;
  const canEdit = authState.authenticated && authState.authUserId === postData.userId 

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

      {canEdit && <Link to={`/admin/post/edit/${postId}`}>Edit</Link>}
    </div>
  );
};

export default PostMeta;
