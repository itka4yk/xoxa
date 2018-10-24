import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { WorkspacesView } from '../views/Workspaces.view';

export const WorkspacesRoute = ({ match }: RouteComponentProps) => <WorkspacesView />;
