import * as React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps, Switch } from 'react-router-dom';
import autobind from 'autobind-decorator';
import { as, injectProps } from '../helpers/react.helpers';
import { IAuthStore, AuthStoreType } from '../modules';

interface IInjectedProps {
  auth: IAuthStore;
}

interface IPrivateRouteProps extends IInjectedProps, RouteProps {}

@injectProps({ auth: AuthStoreType })
@autobind
class PrivateRoutePure extends React.Component<IPrivateRouteProps> {
  routeRenderer(props: RouteComponentProps): React.ReactNode {
    const {
      component,
      auth: { isAuthorized },
    } = this.props;
    const Component: any = component;
    const redirectOptions = {
      pathname: '/login',
      state: { from: this.props.location },
    };
    return isAuthorized ? <Component {...props} /> : <Redirect to={redirectOptions} />;
  }
  render() {
    const { component, auth, ...rest } = this.props;
    return <Route {...rest} render={this.routeRenderer} />;
  }
}

interface ISwitchProps {
  children: React.ReactElement<any>[];
  notFound: (props: RouteProps) => any | React.ComponentClass<RouteProps>;
}

export const SwitchWithNotFound = ({ children, notFound: Component }: ISwitchProps) => (
  <Switch>
    {children}
    <Route component={Component} />
  </Switch>
);

export const PrivateRoute = as<React.ComponentClass<RouteProps>>(PrivateRoutePure);
