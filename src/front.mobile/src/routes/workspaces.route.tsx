import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { WorkspacesView } from '../views/Workspaces.view';
import { SwitchWithNotFound } from 'front.core/lib/containers';
import { NotFoundView } from '../views/NotFound.view';
import { CreateSpaceView } from '../views/CreateSpace.view';
import { SingleSpaceView } from '../views/SingleSpace.view';
import { CreateChannelView } from '../views/CreateChannel.view';
import { ChatView } from '../views/Chat.view';

export const WorkspacesRoute = ({ match }: RouteComponentProps) => (
  <SwitchWithNotFound notFound={NotFoundView}>
    <Route exact path={`${match.path}`} component={WorkspacesView} />
    <Route path={`${match.path}/create`} component={CreateSpaceView} />
    <Route exact path={`${match.path}/single/:spaceId`} component={SingleSpaceView} />
    <Route
      exact
      path={`${match.path}/single/:spaceId/:isPublic?/:channelId?`}
      component={ChatView}
    />
    {/* <Route exact path={`${match.path}/chat`} component={ChatView} /> */}
    <Route
      exact
      path={`${match.path}/single/:spaceId/createChannel/:spaceId`}
      component={CreateChannelView}
    />
  </SwitchWithNotFound>
);
