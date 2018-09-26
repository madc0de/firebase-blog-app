import * as React from "react";
import { PostTitleDocument } from "../interface/PostTitleData";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { formatDateTimeIf } from "../utils/dateUtil";


interface PostListItemProps extends RouteComponentProps<any> {
  postTitle: PostTitleDocument;
}

const PostListItem: React.SFC<PostListItemProps> = ({ postTitle }) => {
  const key = Object.keys(postTitle)[0];
  const postData = postTitle[key];

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
