import * as React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const { component: Component, isAdmin, location, ...rest } = props;

  if (isAdmin == null) {
    throw Error('authenticated property required')
  }

  if (isAdmin === true) {
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
