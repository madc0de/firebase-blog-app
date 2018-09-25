import * as React from "react";
import { Route } from "react-router-dom";
import PostView from "../components/views/PostView";
import { connect } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import PublishedPosts from "../components/views/PublishedPosts";

interface StateProps {
  authState: AuthState;
}

class _BlogSection extends React.Component<StateProps, {}> {
  render() {
    const { authState } = this.props;
    return (
      <div className="blog-section">
        <Route exact path="/" user={authState} component={PublishedPosts} />
        <Route path="/post/:slugOrId" component={PostView} />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState
  };
};

export const BlogSection = connect(mapStateToProps)(_BlogSection);
