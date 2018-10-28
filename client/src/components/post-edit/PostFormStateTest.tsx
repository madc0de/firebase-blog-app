import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from 'src/interface/AppState';
import { PostFormState } from 'src/interface/PostFormState';
import { postFormSubmitError } from 'src/store/actions/postForm';

export interface Props {
  postFormState: PostFormState
  errorChange(error: string): void
}

class PostFormStateTest extends React.Component<Props, any> {

  handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    this.props.errorChange(e.target.value)
  }

  public render() {
    return (
      <div>
        <h4>Post state change test</h4>
        <input type="text" value={this.state.error} onChange={this.handleChange}/>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  postFormState: state.postFormState
})

const mappDispatchToProps = (dispatch: Dispatch) => ({
  errorChange (error: string) { dispatch(postFormSubmitError(error)) }
})

export default connect(mapStateToProps, mappDispatchToProps)(PostFormStateTest)
