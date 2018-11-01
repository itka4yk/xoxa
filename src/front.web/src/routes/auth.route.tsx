import * as React from 'react';
import { RouteComponentProps, Route } from 'react-router';
import { SwitchWithNotFound } from 'front.core/lib/containers';

import { NotFoundView } from '../views/NotFound.view';
import { LoginView } from '../views/Login.view';
import { RegisterView } from '../views/Register.view';

export const AuthRoute = ({ match }: RouteComponentProps) => (
  <SwitchWithNotFound notFound={NotFoundView}>
    <Route exact path={`${match.path}/register`} component={RegisterView} />
    <Route path={`${match.path}/login`} component={LoginView} />
  </SwitchWithNotFound>
);
