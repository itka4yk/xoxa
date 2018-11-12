import * as React from 'react';
import autobind from 'autobind-decorator';

import { AuthStoreType, IAuthStore } from '../auth.store';
import { as, injectProps } from '../../../helpers';

interface IState {
  email: string;
  password: string;
}

interface IInjectedProps {
  store: IAuthStore;
}

export interface IRegisterComponentProps {
  onRegisterSubmit(): void;
  onEmailChange(email: string): void;
  onPasswordChange(password: string): void;
}

@injectProps({ store: AuthStoreType })
@autobind
class RegisterContainer extends React.Component<IInjectedProps, IState> {
  state = {
    email: '',
    password: '',
  };

  handleSubmit() {
    this.props.store.register(this.state.email, this.state.password);
  }

  handleEmailChange = (email: string) => this.setState({ email });
  handlePasswordChange = (password: string) => this.setState({ password });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onRegisterSubmit: this.handleSubmit,
        onEmailChange: this.handleEmailChange,
        onPasswordChange: this.handlePasswordChange,
      } as IRegisterComponentProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(RegisterContainer);
