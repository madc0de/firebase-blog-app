import * as React from "react";
import { connect } from "react-redux";
import {
  Field,
  reduxForm,
  formValueSelector,
  InjectedFormProps,
  SubmissionError,
  submit
} from "redux-form";
import { validatePostFormValues } from "../../validation/validatePost";
import { PostFormState } from "../../interface/PostFormState";
import { PostFormValues } from "../../interface/PostFormValues";
import { AppState } from "../../interface/AppState";
import MarkdownViewer from "../MarkdownViewer";
import SubmitButton from "../SubmitButton";
import { submitPost } from "./submitPost";

interface DispatchProps {
  triggerSubmit(): void;
}

interface StateProps {
  postFormState: PostFormState;
  postBody: string;
}

interface Props extends StateProps, DispatchProps, InjectedFormProps<PostFormValues> {
  onSave(postId: string): void;
}

class PostForm extends React.Component<Props, {}> {
  formRef: React.RefObject<HTMLFormElement>;

  constructor(props: Props) {
    super(props);

    this.formRef = React.createRef();
  }

  componentDidMount() {
    this.triggerSubmiton_metaKey_Enter()
  }

  triggerSubmiton_metaKey_Enter = () => {
    const element = this.formRef.current as HTMLFormElement;
    element.addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.keyCode === 13) {
        this.props.triggerSubmit()
      }
    });
  }

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
      postBody
    } = this.props;
    return (
      <form
        onSubmit={handleSubmit}
        className="post-edit-section"
        ref={this.formRef}
      >
        <div className="post-title">
          <Field name="title" placeholder="Title" component="input" />
        </div>
        <div className="post-action">
          <SubmitButton
            disabled={submitting || invalid || pristine}
            saving={submitting}
          >
            SAVE
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

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  triggerSubmit: () => dispatch(submit("post"))
});

const _connectWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);

const _reduxFormWrapped = reduxForm({
  form: "post",
  validate: validatePostFormValues,
  enableReinitialize: true,
  destroyOnUnmount: true,
  onSubmit: submitPost
})(_connectWrapped);

export default _reduxFormWrapped;
