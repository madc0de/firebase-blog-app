import * as React from "react";
import {
  ModalDialog,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../modal/ModalDialog";


interface State {
  showDialog: boolean
}
export interface Props {
  postId: string
  title: string
}

export default class DeletePost extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = { showDialog: false }
  }

  openDialog = () => this.setState({ showDialog: true })
  closeDialog = () => this.setState({ showDialog: false })

  openDialogClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.openDialog()
  };

  cancelClick = (e: React.SyntheticEvent) => {
    this.closeDialog()
  }

  deleteClick = async (e: React.SyntheticEvent) => {
    this.closeDialog()
  }

  public render() {
    const { showDialog } = this.state
    return (
      <React.Fragment>
        <button className="btn btn-red btn-small" onClick={this.openDialog}>
          Delete
        </button>

        <ModalDialog show={showDialog}>
          <ModalHeader>
            Delete Post?
          </ModalHeader>
          <ModalBody>
            <p>You are about to delete this post. <br />
            You cannot undo do. <br />
            Are your sure?</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={this.cancelClick} className="btn btn-small">Cancel</button>
            <button onClick={this.deleteClick} className="btn btn-small btn-red">Delete</button>
          </ModalFooter>
        </ModalDialog>
      </React.Fragment>
    );
  }
}
