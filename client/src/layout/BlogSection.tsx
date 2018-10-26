import * as React from "react";
import { Route } from "react-router-dom";
import PostView from "../components/post/PostView";
import { connect } from "react-redux";
import { AuthState } from "../interface/AuthState";
import { AppState } from "../interface/AppState";
import Posts from "../components/post/Posts";

interface StateProps {
  authState: AuthState;
}

class _BlogSection extends React.Component<StateProps, {}> {
  render() {
    return (
      <div className="blog-section">
        <Route exact path="/" render={props => {          
          return <Posts filter="published" />
        }} />
        <Route path="/recent" render={props => {          
          return <Posts filter="recent" />
        }} />
        <Route
          path="/post/:slugOrId"
          render={(props: any) => {
            const slugOrId = props.match.params.slugOrId
            return <PostView {...props} slugOrId={slugOrId} />;
          }}
        />
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
