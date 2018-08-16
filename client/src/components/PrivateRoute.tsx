import * as React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { component: Component, authenticated, location, ...rest } = props;

  if (authenticated == null) {
    throw Error('authenticated property required')
  }

  if (authenticated === true) {
    return <Route {...rest} render={props => <Component {...props} />} />;
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
