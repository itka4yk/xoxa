import { ContainerModule, interfaces } from 'inversify';
import { IRouterStore, RouterStoreType, RouterStore } from './router.store';
import { IAuthStore, AuthStoreType, AuthStore } from './auth.store';

export const storesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IRouterStore>(RouterStoreType).to(RouterStore).inSingletonScope();
  bind<IAuthStore>(AuthStoreType).to(AuthStore).inSingletonScope();
});

export { IAuthStore, AuthStoreType } from './auth.store';
export { IRouterStore, RouterStoreType } from './router.store';
