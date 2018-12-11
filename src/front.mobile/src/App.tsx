// tslint:disable:jsx-no-lambda
import 'reflect-metadata';
import React, { Component } from 'react';
import { container } from './diContainer';
import SyncStorage from 'sync-storage';
SyncStorage.init();

import createMemoryHistory from 'history/createMemoryHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { SwitchWithNotFound, PrivateRoute } from 'front.core/lib/containers';
import { RouterStoreType, enableDevTools } from 'front.core';
import { AuthRoute } from './routes/auth.route';
import { NotFoundView } from './views/NotFound.view';
import { WorkspacesRoute } from './routes/workspaces.route';

enableDevTools();
const memoryHistory = createMemoryHistory();
const history = syncHistoryWithStore(memoryHistory, container.get(RouterStoreType));

export default class Root extends Component {
  render() {
    return (
      <Router history={history}>
        <SwitchWithNotFound notFound={NotFoundView}>
          <Route path="/auth" component={AuthRoute} />
          <PrivateRoute path="/workspaces" component={WorkspacesRoute} />
        </SwitchWithNotFound>
      </Router>
    );
  }
}
