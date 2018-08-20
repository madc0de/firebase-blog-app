import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Header from "../layout/Header";
import PostForm from "../forms/PostForm";
import { postFormActions } from "../../store/actions";
import { PostFormState } from "../../interface/PostFormState";
import { AppState } from "../../interface/AppState";
import { PageContent } from "../layout";
interface RouteParamProps {
  postId: string | undefined;
}

interface DispatchToProps {
  initializeViewState(): void;
  loadExistingPostFormValues(postId: string | undefined): void;
  loadNewPostFormValues(): void;
}

export interface PostFormViewProps
  extends DispatchToProps,
    RouteComponentProps<RouteParamProps> {
  postFormState: PostFormState;
}

class PostFormView extends React.Component<PostFormViewProps, PostFormState> {
  constructor(props: PostFormViewProps) {
    super(props);

    props.initializeViewState();
  }

  async componentDidMount() {
    const { postId } = this.props.match.params;
    if (postId) {
      this.props.loadExistingPostFormValues(postId as string);
    } else {
      this.props.loadNewPostFormValues();
    }
  }

  redirectToPostView = (postId: string) => {
    this.props.history.push(`/post/${postId}`);
  };

  render() {
    const { loadingStatus, formValues, postId } = this.props.postFormState;

    if (loadingStatus === "init") {
      return <div />;
    }
    if (loadingStatus === "loading") {
      return (
        <div>
          <Header />
          <div className="view-loading">Loading....</div>;
        </div>
      );
    }
    if (loadingStatus === "not-found") {
      return (
        <div>
          <Header />
          <div className="not-found">
            Sorry couldn't find post with id {postId}
          </div>
        </div>
      );
    }

    return (
      <div className="full-height">
        <Header />
        <PageContent>
          <PostForm
            onSave={this.redirectToPostView}
            initialValues={formValues}
          />
        </PageContent>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  postFormState: state.postFormState
});

const mapDispatchToProps = (dispatch: any): DispatchToProps => ({
  initializeViewState: () =>
    dispatch(postFormActions.postFormSetStatusAction("init")),
  loadExistingPostFormValues: (postId: string) =>
    dispatch(postFormActions.loadPostFormValuesAction(postId)),
  loadNewPostFormValues: () =>
    dispatch(postFormActions.async_newPost_SetFormValuesAction())
});

const _connectWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormView);

export default withRouter(_connectWrapped);
