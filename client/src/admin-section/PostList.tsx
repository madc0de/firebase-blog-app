import * as React from "react";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { PostDocument } from "../interface/PostData";


type SortOption = "title" | "updated";

interface StateProps {
  sortBy: SortOption;
}
interface MappedStateProps {
  posts: PostDocument[];
}

export interface Props extends MappedStateProps {}

export default class _PostList extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props);

    this.state = {
      sortBy: "title"
    };
  }

  sortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption;
    this.setState({
      sortBy: value
    });
  };

  public render() {
    const { posts } = this.props;
    const { sortBy } = this.state;

    console.log("sortBy: " + sortBy);

    const sortHandler =
      sortBy === "updated" ? sortUpdateDescending : sortTitleAscending;
    const sortedPosts = posts.sort(sortHandler);

    return (
      <React.Fragment>
        <select name="sortby" onChange={this.sortByChange}>
          <option value="title">Title</option>
          <option value="updated">Updated</option>
        </select>
        <div className="post-list">
          {sortedPosts.map((postTitle, index) => {
            const key = Object.keys(postTitle)[0];

            return <PostListItem key={key} post={postTitle} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

function sortTitleAscending(docA: PostDocument, docB: PostDocument) {
  const ka = Object.keys(docA)[0];
  const kb = Object.keys(docB)[0];

  const dataA = docA[ka];
  const dataB = docB[kb];

  const titleA = dataA.title;
  const titleB = dataB.title;

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
}

function sortUpdateDescending(docA: PostDocument, docB: PostDocument) {
  const ka = Object.keys(docA)[0];
  const kb = Object.keys(docB)[0];

  const dataA = docA[ka];
  const dataB = docB[kb];

  const updated_date_A = dataA.updated_date as number
  const updated_date_B = dataB.updated_date as number

  if (updated_date_A > updated_date_B) {
    return -1;
  }
  if (updated_date_A < updated_date_B) {
    return 1;
  }
  return 0;
}

const mapStateToProps = (state: AppState): MappedStateProps => ({
  posts: state.postsState.posts
});

export const PostList = connect(mapStateToProps)(_PostList);
