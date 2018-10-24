import * as React from 'react';
import autobind from 'autobind-decorator';

import { IAuthStore, AuthStoreType } from '../auth.store';
import { injectProps, as } from '../../../helpers';

interface IState {
  email: string;
  password: string;
}

interface IInjectedProps {
  store: IAuthStore;
}

export interface ILoginComponentProps {
  onLoginSubmit(): void;
  onEmailChange(email: string): void;
  onPasswordChange(password: string): void;
}

@injectProps({ store: AuthStoreType })
@autobind
class LoginContainer extends React.Component<IInjectedProps, IState> {
  state = {
    email: '',
    password: '',
  }

  handleSubmit() {
    this.props.store.signIn(this.state.email, this.state.password);
  }

  handleEmailChange = (email: string) => this.setState({ email });
  handlePasswordChange = (password: string) => this.setState({ password });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) => React.cloneElement(child, {
      onLoginSubmit: this.handleSubmit,
      onEmailChange: this.handleEmailChange,
      onPasswordChange: this.handlePasswordChange,
    } as ILoginComponentProps));
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(LoginContainer);
