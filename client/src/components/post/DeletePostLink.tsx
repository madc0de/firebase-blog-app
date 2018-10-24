import * as React from "react";
import Modal from "../modal/Modal";

interface State {
  showDialog: boolean;
}
export interface Props {
  postId: string;
  postTitle: string;
}

export class DeletePostLink extends React.Component<Props, State> {
  state = {
    showDialog: false
  };

  openDialog = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({ showDialog: true });
  };

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  deleteClick = async (e: React.SyntheticEvent) => {
    // call cation
    this.setState({ showDialog: false });
  };

  public render() {
    const { showDialog } = this.state;
    const { postTitle } = this.props;
    return (
      <React.Fragment>
        <a className="link" href="#" onClick={this.openDialog}>
          Delete
        </a>

        <Modal open={showDialog} onClose={this.closeDialog}>
          <h3>Delete Post</h3>
          <div>Delete this post?</div>
          <div>{postTitle}</div>
          <div className="btn-group">
            <button onClick={this.closeDialog} className="btn btn-small">
              Cancel
            </button>
            <button
              onClick={this.deleteClick}
              className="btn btn-small btn-red"
            >
              Delete
            </button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
