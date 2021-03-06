import * as React from 'react';
import autobind from 'autobind-decorator';

import { IAuthService, AuthServiceType } from '../auth.service';
import { injectProps, as } from '../../../helpers';

interface IInjectedProps {
  store: IAuthService;
}

export interface ILogoutComponentProps {
  onLogout(): void;
}

@injectProps({ store: AuthServiceType })
@autobind
class LogoutContainer extends React.Component<IInjectedProps> {
  handleLogout() {
    this.props.store.signOut();
  }

  handleEmailChange = (email: string) => this.setState({ email });
  handlePasswordChange = (password: string) => this.setState({ password });

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onLogout: this.handleLogout,
      } as ILogoutComponentProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(LogoutContainer);
