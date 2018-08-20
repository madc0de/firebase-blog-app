import * as React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { component: Component, authState, location, ...rest } = props;


  if (authState.authenticated) {
    if (authState.isAdmin == null) {
      throw Error("authenticated property required");
    }

    if (authState.isAdmin === true) {
      return <Route {...rest} render={props => <Component {...props} />} />;
    }

    // non admin cannot access private route, redirect to 'home'
    <Redirect
      to={{
        pathname: "/",
        state: { from: props.location }
      }}
    />;
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )}
    />
  );
};

const _PrivateRoute = withRouter(PrivateRoute);
export default _PrivateRoute;
