import * as React from "react";
import { PostDocument } from "../interface/PostData";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { formatDateTimeIf } from "../utils/dateUtil";


interface PostListItemProps extends RouteComponentProps<any> {
  post: PostDocument;
}

const PostListItem: React.SFC<PostListItemProps> = ({ post }) => {
  const key = Object.keys(post)[0];
  const postData = post[key];

  const updated_date = formatDateTimeIf(postData.updated_date as number);
  const statusClass = postData.status

  return (
    <div className="post-list-item">
      <div className="title">
        <Link to={`/admin/post/${key}`}>{postData.title}</Link>
      </div>
      <div className="meta">
        <div className="date">{updated_date}</div>
        <div className={`status ${statusClass}`}>{postData.status}</div>
      </div>
    </div>
  );
};

export default withRouter(PostListItem);
