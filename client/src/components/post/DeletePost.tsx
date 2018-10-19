import * as React from "react";
import Modal from "../modal/Modal";

interface State {
  showDialog: boolean;
}
export interface Props {
  postId: string;
  title: string;
}

export default class DeletePost extends React.Component<Props, State> {
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
    return (
      <React.Fragment>
        <button className="btn btn-red btn-small" onClick={this.openDialog}>
          Delete
        </button>

        <Modal open={showDialog} onClose={this.closeDialog}>
          <h3>Delete Post</h3>
          <p>
            You are about to delete this post. <br />
            You cannot undo do. <br />
            Are your sure?
          </p>
          <div>
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
