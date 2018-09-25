import * as React from "react";
import { PostList } from "./PostList";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import { connect } from "react-redux";

interface StateProps {
  authState: AuthState
}
interface Props extends StateProps {
  
}

class _PostAdminSection extends React.Component<Props, any> {
  render() {
    return (
      <div className="post-admin-section">
        <div className="post-admin-section--list">
          <PostList />
        </div>
        <div className="post-admin-section--post">
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState
  };
};

export const PostAdminSection = connect(mapStateToProps)(_PostAdminSection)

