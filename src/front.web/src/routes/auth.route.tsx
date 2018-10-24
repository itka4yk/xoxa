import * as React from 'react';
import { RouteComponentProps, Route } from 'react-router';
import { SwitchWithNotFound } from 'front.core/lib/containers';

import { NotFoundView } from '../views/NotFound.view';

const Login = () => <div>Login</div>;
const Register = () => <div>Register</div>;

export const AuthRoute = ({ match }: RouteComponentProps) => (
  <SwitchWithNotFound notFound={NotFoundView}>
    <Route exact path={`${match.path}/register`} component={Register} />
    <Route path={`${match.path}/login`} component={Login} />
  </SwitchWithNotFound>
);
