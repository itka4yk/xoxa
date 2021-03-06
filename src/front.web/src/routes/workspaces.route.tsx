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
    <Route
      exact
      path={`${match.path}/single/:spaceId/:isPublic?/:channelId?`}
      component={SingleSpaceView}
    />
    <Route
      exact
      path={`${match.path}/single/:spaceId/settings`}
      // tslint:disable-next-line:jsx-no-lambda
      component={() => <div>Settings</div>}
    />
    <Route path={`${match.path}/create`} component={CreateSpaceView} />
  </SwitchWithNotFound>
);
