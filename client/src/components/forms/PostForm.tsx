/*  tslint:disable */
import * as React from "react";
import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  InjectedFormProps,
  SubmissionError
} from "redux-form";
import {
  RenderTextInput,
  RenderTextArea,
  RenderSelect,
  RenderDateInput
} from "../../form/RenderFields";
import { validatePostFormValues } from "../../validation/validatePost";
import { postFormActions } from "../../store/actions";
import { PostFormState } from "../../interface/PostFormState";
import { PostFormValues } from "../../interface/PostFormValues";
import { PostStatus } from "../../interface/PostData";
import { AppState } from "../../interface/AppState";

interface MapStateProps {
  postFormState: PostFormState;
}

interface MapDispatchProps {
  savePost(postId: string, formValues: PostFormValues): void;
}

interface PostFormProps extends MapDispatchProps, MapStateProps {
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
    const {
      handleSubmit,
      invalid,
      submitting,
      pristine,
      error,
      reset,
    } = this.props;

    const draftStatus: PostStatus = "draft";
    const publishStatus: PostStatus = "published";

    return (
      <form onSubmit={handleSubmit(this.savePost)}>
        <div className="veritical-form">
          {error && <div className="submission-error">{error}</div>}
          <div className="two-columns">
            <Field
              name="title"
              placeholder="Title"
              component={RenderTextInput}
            />
            <Field name="slug" placeholder="Post url" component={RenderTextInput} />
          </div>
          <Field name="body" component={RenderTextArea} />

          <div className="two-columns">
            <Field name="status" component={RenderSelect}>
              <option value={draftStatus}>Draft</option>
              <option value={publishStatus}>Published</option>
            </Field>
            <div> 
              <Field name="publish_date_string" component={RenderDateInput} />
            </div>
          </div>
          <div className="button-group">
            <button
              className="btn btn-primary"
              disabled={submitting || invalid || pristine}
              type="submit"
            >
              Submit
            </button>
            <button className="btn btn-warning" onClick={reset}>
              Reset
            </button>
            {submitting && <span>saving...</span>}
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  postFormState: state.postFormState
});

const mapDispatchToProps = (dispatch: any) => ({
  savePost: (postId: string, formValues: PostFormValues) =>
    dispatch(postFormActions.asyncSavePostAction(postId, formValues))
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
