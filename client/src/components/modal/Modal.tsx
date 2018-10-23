import * as React from "react";

interface Props {
  open: boolean;
  children?: any;
  onClose(): void;
}

export default class extends React.Component<Props, {}> {
  componentDidMount() {}

  modalClick = (e: React.SyntheticEvent) => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  stopPropagation = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  render() {
    const { open, children } = this.props;

    const modalStyle = {
      display: open ? "block" : "none",
    };

    let clonedChildren = undefined;
    if (Array.isArray(children)) {
      clonedChildren = this.props.children.map((child: any, index: number) => {
        return React.cloneElement(child, { onclick: this.stopPropagation });
      });
    } else {
      clonedChildren = React.cloneElement(children, {
        onClick: this.stopPropagation
      });
    }

    return (
      <div className='modal'  style={modalStyle} onClick={this.modalClick}>
        <div className="modal-content">
          {clonedChildren}
        </div>
      </div>
    );
  }
}
