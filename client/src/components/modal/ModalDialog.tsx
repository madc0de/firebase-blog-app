import * as React from 'react';

interface ContentProps {
  children: any
}

export const ModalHeader: React.SFC<ContentProps> = ({ children }) => (
  <div className="modal-header">{children}</div>
);

export const ModalBody: React.SFC<ContentProps> = ({ children }) => (
  <div className="modal-body">{children}</div>
);

export const ModalFooter: React.SFC<ContentProps> = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

interface Props {
  children: any
  show: boolean
}

export class ModalDialog extends React.Component<Props, {}> {
  render() {
    const { children, show } = this.props;
    const style = { display: show ? "block" : "none" };

    return (
      <div className="modal-container" style={style}>
        <div className="modal-content">{children}</div>
      </div>
    );
  }
}
