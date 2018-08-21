import * as React from "react";
import { connect } from "react-redux";
import { signInWithGoogle, signInWithGithub, signInWithFacebook } from "../../data/Auth";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";
import { PageContent } from "../layout";

interface ConnectProps {
  authState: AuthState;
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

  signInWithGoogle = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    signInWithGoogle();
  };

  signInWithGithub = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    signInWithGithub();
  };

  signInWithFacebook = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    signInWithFacebook();
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
      <PageContent>
        <div className="signin-wrap">
          <div className="signin-box">
            <button className="btn google" onClick={this.signInWithGoogle}>
              Sign in with Google
            </button>
            <button className="btn github" onClick={this.signInWithGithub}>
              Sign in with Github
            </button>
            <button className="btn facebook" onClick={this.signInWithFacebook}>
              Sign in with Facebook
            </button>
          </div>
        </div>
      </PageContent>
    );
  }
}

const mapStateToProps = (state: AppState): ConnectProps => ({
  authState: state.authState
});

const _SigninView = connect(mapStateToProps)(withRouter(SigninView));

export default _SigninView;
