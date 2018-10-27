import * as React from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { postFormActions } from "../../store/actions";
import { PostFormState } from "../../interface/PostFormState";
import { AppState } from "../../interface/AppState";
import { Loading } from "../layout";

interface DispatchToProps {
  loadExistingPostFormValues(postId: string | undefined): void;
  loadNewPostFormValues(): void;
}

export interface Props extends DispatchToProps {
  postFormState: PostFormState;
  postId: string | undefined;
}

class PostFormWrapper extends React.Component<Props, PostFormState> {
  async componentDidMount() {
    const { postId } = this.props;
    if (postId) {
      this.props.loadExistingPostFormValues(postId as string);
    } else {
      this.props.loadNewPostFormValues();
    }
  }

  redirectToPostView = (postId: string) => {
    // this.props.history.push(`/post/${postId}`);
  };

  render() {
    const { loadingStatus, formValues, postId } = this.props.postFormState;

    if (loadingStatus === "loading") {
      return <Loading />;
    }
    if (loadingStatus === "not-found") {
      return (
        <div className="not-found">
          Sorry couldn't find post with id {postId}
        </div>
      );
    }

    return (
      <div className="full-height">
        <PostForm onSave={this.redirectToPostView} initialValues={formValues} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    postFormState: state.postFormState
  };
};
const mapDispatchToProps = (dispatch: any): DispatchToProps => ({
  loadExistingPostFormValues: (postId: string) =>
    dispatch(postFormActions.loadPostFormValuesAction(postId)),
  loadNewPostFormValues: () =>
    dispatch(postFormActions.async_newPost_SetFormValuesAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormWrapper);
