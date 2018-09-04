import * as React from "react";
import { FaSpinner } from "react-icons/fa";

interface Props {
  disabled: boolean;
  saving: boolean;
  children: any;
}

const SubmitButton: React.SFC<Props> = ({ children, saving, disabled }) => {
  return (
    <button type="submit" disabled={disabled} className="btn btn-blue btn-small">
      {saving ? (
        <FaSpinner className="spin" />
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </button>
  );
};

export default SubmitButton;
