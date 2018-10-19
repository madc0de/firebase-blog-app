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

    const style = {
      display: open ? "block" : "none",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7"
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
      <div style={style} onClick={this.modalClick}>
        {clonedChildren}
      </div>
    );
  }
}
