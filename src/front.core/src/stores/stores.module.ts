import { ContainerModule, interfaces } from 'inversify';
import { IRouterStore, RouterStoreType, RouterStore } from './router.store';
import { NotificationsStoreType, INotificationsStore, NotificationsStore } from './notifications.store';

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IRouterStore>(RouterStoreType).to(RouterStore).inSingletonScope();
  bind<INotificationsStore>(NotificationsStoreType).to(NotificationsStore).inSingletonScope();
});

export { IRouterStore, RouterStoreType } from './router.store';
export { INotificationsStore, NotificationsStoreType } from './notifications.store';
