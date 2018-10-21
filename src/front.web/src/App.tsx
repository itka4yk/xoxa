import 'reflect-metadata';
import * as React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { container } from './diContainer';

import { enableDevTools } from 'front.core/lib/helpers/devtools';
import { PrivateRoute, SwitchWithNotFound } from 'front.core/lib/containers';
import { NotFoundView } from './views/NotFound.view';
import { TodoView } from './views/Todo.view';
import { LoginView } from './views/Login.view';
import { RouterStoreType } from 'front.core';

enableDevTools();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, container.get(RouterStoreType));

const App: any = () => (
  <Router history={history}>
    <SwitchWithNotFound notFound={NotFoundView}>
      <Route exact path="/login" component={LoginView} />
      <PrivateRoute path="/todo" component={TodoView} />
    </SwitchWithNotFound>
  </Router>
);

export default App;

declare var module: {
  hot: {
    accept(callback: () => void): void;
  };
};

if (module.hot) {
  module.hot.accept(() => window.location.reload());
}
