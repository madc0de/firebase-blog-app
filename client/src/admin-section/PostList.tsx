import * as React from "react";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";
import PostListItem from "./PostListItem";
import { PostTitleData } from "../interface/PostTitleData";
import { FirestoreDocument } from "../interface/FirestoreDocument";

type SortOption = "title" | "updated";

type PostTitleDoc = FirestoreDocument<PostTitleData>;

interface StateProps {
  sortBy: SortOption;
}
interface MappedStateProps {
  postTitles: FirestoreDocument<PostTitleData>[];
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
    const { postTitles } = this.props;
    const { sortBy } = this.state;

    console.log("sortBy: " + sortBy);

    const sortHandler =
      sortBy === "updated" ? sortUpdateDescending : sortTitleAscending;
    const sortedPosts = postTitles.sort(sortHandler);

    return (
      <React.Fragment>
        <select name="sortby" onChange={this.sortByChange}>
          <option value="title">Title</option>
          <option value="updated">Updated</option>
        </select>
        <div className="post-list">
          {sortedPosts.map((postTitle, index) => {
            const key = Object.keys(postTitle)[0];

            return <PostListItem key={key} postTitle={postTitle} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

function sortTitleAscending(docA: PostTitleDoc, docB: PostTitleDoc) {
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

function sortUpdateDescending(docA: PostTitleDoc, docB: PostTitleDoc) {
  const ka = Object.keys(docA)[0];
  const kb = Object.keys(docB)[0];

  const dataA = docA[ka];
  const dataB = docB[kb];

  const updated_date_A = dataA.updated_date;
  const updated_date_B = dataB.updated_date;

  if (updated_date_A > updated_date_B) {
    return -1;
  }
  if (updated_date_A < updated_date_B) {
    return 1;
  }
  return 0;
}

const mapStateToProps = (state: AppState): MappedStateProps => ({
  postTitles: state.postTitlesState.postTitles
});

export const PostList = connect(mapStateToProps)(_PostList);
