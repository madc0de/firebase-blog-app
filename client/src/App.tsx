import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from "react-redux";

import PublishedPosts from "./components/views/PublishedPosts";
import RecentPosts from "./components/views/RecentPosts";
import PostView from "./components/views/PostView";
import SigninView from "./components/views/SigninView";
import PostFormView from "./components/views/PostFormView";
import PrivateRoute from "./components/route/PrivateRoute";
import Loading from "./components/layout/Loading";
import { AuthState } from "./interface/AuthState";
import { AppInitState } from "./interface/AppInitState";
import { BlogSettingData } from "./interface/BlogSettingData";
import { AppState } from "./interface/AppState";

interface AppProps {}
interface StateProps {
  authState: AuthState;
  appInitState: AppInitState;
  blogSettings: BlogSettingData;
}

class App extends React.Component<AppProps & StateProps, {}> {
  componentDidUpdate() {
    if (this.props.blogSettings.loaded && !document.title) {
      document.title = this.props.blogSettings.blog_title;
    }
  }

  public render() {
    const { authState, appInitState } = this.props;

    if (!appInitState.initialized) {
      return <Loading />
    }

    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" user={authState} component={PublishedPosts} />
          <Route path="/signin" component={SigninView} />
          <Route path="/post/:slug" component={PostView} />

          <PrivateRoute
            exact
            path="/recent"
            authState={authState}
            component={RecentPosts}
          />
          <PrivateRoute
            path="/new-post"
            authState={authState}
            component={PostFormView}
          />
          <PrivateRoute
            path="/edit-post/:postId"
            authState={authState}
            component={PostFormView}
          />
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState,
    appInitState: state.appInitState,
    blogSettings: state.blogSettingsState
  };
};

const _App = connect(mapStateToProps)(App);

export default _App;
