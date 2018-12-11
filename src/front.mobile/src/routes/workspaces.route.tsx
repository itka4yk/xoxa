import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { WorkspacesView } from '../views/Workspaces.view';
import { SwitchWithNotFound } from 'front.core/lib/containers';
import { NotFoundView } from '../views/NotFound.view';
import { CreateSpaceView } from '../views/CreateSpace.view';
import { SingleSpaceView } from '../views/SingleSpace.view';

export const WorkspacesRoute = ({ match }: RouteComponentProps) => (
  <SwitchWithNotFound notFound={NotFoundView}>
    <Route exact path={`${match.path}`} component={WorkspacesView} />
    <Route path={`${match.path}/create`} component={CreateSpaceView} />
    <Route exact path={`${match.path}/single/:spaceName`} component={SingleSpaceView} />
  </SwitchWithNotFound>
);

    {/* <Route exact path={`${match.path}/single/:spaceName`} component={SingleSpaceView} />
    <Route
      exact
      path={`${match.path}/single/:spaceName/settings`}
      // tslint:disable-next-line:jsx-no-lambda
      component={() => <div>Settings</div>}
/> */}