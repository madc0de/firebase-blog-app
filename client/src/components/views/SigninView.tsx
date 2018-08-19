import * as React from "react";
import { connect } from "react-redux";
import { signInWithGoogle } from "../../data/Auth";
import { IAppState, IAuthState } from "../../interface";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import Header from "../layout/Header";

interface ConnectProps {
  authState: IAuthState;
}
interface SigninState {
  from: any;
}

export interface SigninViewProps
  extends ConnectProps,
    RouteComponentProps<any> {}

class SigninView extends React.Component<SigninViewProps, SigninState> {
  constructor(props: SigninViewProps) {
    super(props);

    this.state = {
      from: props.location.state ? props.location.state.from : ""
    };
  }

  onSigninClick = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    signInWithGoogle();
  };

  render() {
    const { authState } = this.props;
    const { state } = this;

    if (authState.authenticated) {
      if (state.from) {
        return <Redirect to={state.from.pathname} />;
      }
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header />
        <section className="page-content signin-wrapper">
          <div className="signin">
            {!authState.authenticated ? (
              <button className="btn" onClick={this.onSigninClick}>
                Signin with Google
              </button>
            ) : (
              <h3>Already signed in as {authState.authUserData.displayName}</h3>
            )}
          </div>
        </section>
      </div>
    );
  }
}

const _SigninView = connect((state: IAppState) => ({
  authState: state.authState
}))(withRouter(SigninView));

export default _SigninView;
