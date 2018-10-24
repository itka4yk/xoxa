import { ContainerModule, interfaces } from 'inversify';
import { IAuthStore, AuthStoreType, AuthStore } from './auth.store';

export const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthStore>(AuthStoreType).to(AuthStore).inTransientScope().onActivation((c, i: any) => {
    i.onActivation();
    return i;
  });
});

export { IAuthStore, AuthStoreType } from './auth.store';
