import * as React from "react";
import { AppState } from "../interface/AppState";
import { connect, Dispatch } from "react-redux";
import PostListItem from "./PostListItem";
import { PostDocument } from "../interface/PostData";
import { loadUserPosts } from "src/store/actions/post";
import { AuthState } from "src/interface/AuthState";


type SortOption = "title" | "updated";

interface StateProps {
  sortBy: SortOption;
}

interface MappedStateProps {
  authState: AuthState
  posts: PostDocument[];
}

interface DispatchProps {
  loadUserPosts(userId: string): void
}

export interface Props extends DispatchProps {

}

export default class _PostList extends React.Component<Props & MappedStateProps, StateProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      sortBy: "title"
    };
  }

  componentDidMount() {
    const userId = this.props.authState.authUserId
    this.props.loadUserPosts(userId)
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
  authState: state.authState,
  posts: state.postsState.posts
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  loadUserPosts(userId: string) {
    dispatch(loadUserPosts(userId));
  }
});


export const PostList = connect(mapStateToProps, mapDispatchToProps)(_PostList);
