import 'reflect-metadata';
import * as React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import store from 'store';
import { ILocalStorage } from 'front.core/lib/services/persist.service';
import { injectable } from 'inversify';

@injectable()
class Storage implements ILocalStorage {
  getFromStore = key => store.get(key);
  saveToStore = (key, value) => store.set(key, value);
}

import { container } from './diContainer';
container.bind<ILocalStorage>('STORAGE').to(Storage);

import { enableDevTools } from 'front.core/lib/helpers/devtools';
import { PrivateRoute, SwitchWithNotFound } from 'front.core/lib/containers';
import { NotFoundView } from './views/NotFound.view';
import { TodoView } from './views/Todo.view';
import {
  INotification,
  INotificationsStore,
  NotificationsStoreType,
  RouterStoreType,
} from 'front.core';
import { AuthRoute } from './routes/auth.route';
import { WorkspacesRoute } from './routes/workspaces.route';
import toastr from 'toastr';

enableDevTools();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, container.get(RouterStoreType));
const notificationStore = container.get<INotificationsStore>(NotificationsStoreType);
// function notifyMe(notification: string) {
//   if (!('Notification' in window)) return;
//   if (Notification.permission === 'granted') {
//     new Notification(notification);
//   } else if (Notification.permission !== 'denied') {
//     Notification.requestPermission().then((permission: string) => {
//       if (permission === 'granted') {
//         new Notification(notification);
//       }
//     });
//   }
// }

notificationStore.initNotifications(({ type, body }: INotification) => {
  toastr[type](body);
  // notifyMe(body);
});

const App: any = () => (
  <div>
    <Router history={history}>
      <SwitchWithNotFound notFound={NotFoundView}>
        <Route path="/auth" component={AuthRoute} />
        <PrivateRoute path="/workspaces" component={WorkspacesRoute} />
        <PrivateRoute path="/todo" component={TodoView} />
      </SwitchWithNotFound>
    </Router>
  </div>
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
