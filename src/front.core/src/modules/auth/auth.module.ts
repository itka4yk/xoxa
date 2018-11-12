import { ContainerModule, interfaces } from 'inversify';
import { AuthStore, AuthStoreType, IAuthStore } from './auth.store';

export const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthStore>(AuthStoreType).to(AuthStore).inSingletonScope().onActivation((c, i: any) => {
    i.onActivation();
    return i;
  });
});

export { IAuthStore, AuthStoreType } from './auth.store';
