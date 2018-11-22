import { ContainerModule, interfaces } from 'inversify';
import { AuthService, AuthServiceType, IAuthService } from './auth.service';
import { AuthStore, AuthStoreType, IAuthStore } from './auth.store';

export const authModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IAuthService>(AuthServiceType)
    .to(AuthService)
    .inSingletonScope()
    .onActivation((c, i: any) => {
      i.onActivation();
      return i;
    });
  bind<IAuthStore>(AuthStoreType)
    .to(AuthStore)
    .inSingletonScope();
});

export { IAuthService, AuthServiceType } from './auth.service';
