import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";

import SigninView from "./components/signin/SigninView";
import Loading from "./components/layout/Loading";
import { AuthState } from "./interface/AuthState";
import { AppInitState } from "./interface/AppInitState";
import { AppState } from "./interface/AppState";
import PrivateRoute from "./components/route/PrivateRoute";
import blogSettings from "./blogSettings";
import { BlogSection } from "./layout/BlogSection";
import { AdminSection } from "./layout/AdminSection";

interface AppProps {}
interface StateProps {
  authState: AuthState;
  appInitState: AppInitState;
}

class App extends React.Component<AppProps & StateProps, {}> {
  componentDidUpdate() {
    document.title = blogSettings.blog_title;
  }

  public render() {
    const { authState, appInitState } = this.props;

    if (!appInitState.initialized) {
      return <Loading />;
    }

    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route exact path="/" user={authState} component={BlogSection} />
            <Route path="/signin" component={SigninView} />
            <Route exact path="/recent" component={BlogSection} />
            <Route path="/post" component={BlogSection} />
            <PrivateRoute
              authState={authState}
              path="/admin"
              component={AdminSection}
            />
            <Route
              render={() => (
                <div style={{ padding: "5rem" }}>
                  <h1>404 not found</h1>
                </div>
              )}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => {
  return {
    authState: state.authState,
    appInitState: state.appInitState
  };
};

const _App = connect(mapStateToProps)(App);

export default _App;
