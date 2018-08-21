import * as React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { AuthState } from "../../interface/AuthState";
import { AppState } from "../../interface/AppState";
import { PageContent } from "../layout";
import { SigninProviderOption, signInWithProviderAction } from "../../data/Auth";

interface StateProps {
  authState: AuthState;
}

interface DispatchProps {
  signInWithProvider(authProvider: SigninProviderOption): void
}

interface SigninState {
  from: any;
}

export interface SigninViewProps
  extends StateProps, DispatchProps,
    RouteComponentProps<any> {}

class SigninView extends React.Component<SigninViewProps, SigninState> {
  constructor(props: SigninViewProps) {
    super(props);

    this.state = {
      from: props.location.state ? props.location.state.from : "",
    };
  }

  signInWithGoogle = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.signInWithProvider("google")
  };

  signInWithGithub = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.signInWithProvider("github")
  };

  signInWithFacebook = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.signInWithProvider("facebook")
  };


  render() {
    const { authState } = this.props;
    const { state } = this;
    
    if (authState.authenticated) {
      if (state.from && state.from.pathname != '/signin') {
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

const mapDispatchToProps = (dispatch: any) => ({
  signInWithProvider: (authProvider: SigninProviderOption) => dispatch(signInWithProviderAction(authProvider))
})

const mapStateToProps = (state: AppState): StateProps => ({
  authState: state.authState
});

const _SigninView = connect(mapStateToProps, mapDispatchToProps)(withRouter(SigninView));

export default _SigninView;
