import * as React from "react";
import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  formValueSelector,
  InjectedFormProps,
  SubmissionError
} from "redux-form";
import { validatePostFormValues } from "../../validation/validatePost";
import { postFormActions } from "../../store/actions";
import { PostFormState } from "../../interface/PostFormState";
import { PostFormValues } from "../../interface/PostFormValues";
import { AppState } from "../../interface/AppState";
import MarkdownViewer from "../MarkdownViewer";
import SubmitButton from "../SubmitButton";

interface StateProps {
  postFormState: PostFormState;
  postBody: string;
}

interface DispatchProps {
  savePost(postId: string, formValues: PostFormValues): void;
}

interface PostFormProps extends DispatchProps, StateProps {
  onSave(postId: string): void;
}

class PostForm extends React.Component<
  PostFormProps & InjectedFormProps<PostFormValues>,
  {}
> {
  savePost = async (values: PostFormValues) => {
    const { postId } = this.props.initialValues;
    await this.props.savePost(postId as string, values);
  };

  componentDidUpdate() {
    const { postFormState, onSave } = this.props;
    if (postFormState.submitStatus === "saved") {
      onSave(postFormState.postId as string);
    }
    if (postFormState.submitStatus === "error") {
      throw new SubmissionError({ _error: postFormState.error });
    }
  }

  render() {
    const { handleSubmit, invalid, submitting, pristine, postBody } = this.props;

    console.log('postByd', postBody)

    return (
      <form
        onSubmit={handleSubmit(this.savePost)}
        className="post-edit-section"
      >
        <div className="post-title">
          <Field name="title" placeholder="Title" component="input" />
        </div>
        <div className="post-action">
          <SubmitButton
            disabled={submitting || invalid || pristine}
            saving={submitting}
          >
            Save
          </SubmitButton>
        </div>
        <div className="post-body">
          <Field name="body" component="textarea" />
        </div>
        <div className="post-body-preview">
          <MarkdownViewer markdown={postBody} />
        </div>
      </form>
    );
  }
}

const selector = formValueSelector("post");
const mapStateToProps = (state: AppState): StateProps => ({
  postFormState: state.postFormState,
  postBody: selector(state, "body")
});

const mapDispatchToProps = (dispatch: any) => ({
  savePost: (postId: string, formValues: PostFormValues) =>
    dispatch(postFormActions.savePostAction(postId, formValues))
});

const _connectWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

const _reduxFormWrapped = reduxForm({
  form: "post",
  validate: validatePostFormValues,
  enableReinitialize: true,
  destroyOnUnmount: true
})(_connectWrapped);

export default _reduxFormWrapped;
