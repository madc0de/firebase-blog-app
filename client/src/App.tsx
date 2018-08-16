import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { connect } from "react-redux";
import { IAppState, IAuthState, IAppInitState } from "./interface";

import PublishedPosts from "./components/views/PublishedPosts";
import RecentPosts from "./components/views/RecentPosts";
import PostView from "./components/views/PostView";
import SigninView from "./components/views/SigninView";
import PostFormPage from "./components/views/PostFormView";
import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/layout/Loading";

interface AppProps {}
interface ConnectProps {
  authState: IAuthState;
  appInitState: IAppInitState;
}

class App extends React.Component<AppProps & ConnectProps, any> {
  public render() {
    const { authState, appInitState } = this.props;

    if (
      !appInitState.initialized ||
      authState == null ||
      authState.authenticated == null
    ) {
      return <Loading>Pauly's Blog...</Loading>;
    }

    return (
      <Router>
        <div>
          <Route exact path="/" user={authState} component={PublishedPosts} />
          <Route path="/signin" component={SigninView} />
          <Route path="/post/:slug" component={PostView} />

          <PrivateRoute
            exact
            path="/recent"
            authenticated={authState.authenticated}
            component={RecentPosts}
          />
          <PrivateRoute
            path="/new-post"
            authenticated={authState.authenticated}
            component={PostFormPage}
          />
          <PrivateRoute
            path="/edit-post/:postId"
            authenticated={authState.authenticated}
            component={PostFormPage}
          />
        </div>
      </Router>
    );
  }
}

const _App = connect((state: IAppState) => {
  return {
    authState: state.authState,
    appInitState: state.appInitState
  };
})(App);

export default _App;
