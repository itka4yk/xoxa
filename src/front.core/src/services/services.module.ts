import { ContainerModule, interfaces } from 'inversify';
import { IApiService, ApiServiceType, ApiService } from './api.service';
import { IPersistService, PersistServiceType, PersistService } from './persist.service';

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IPersistService>(PersistServiceType).to(PersistService);
  bind<IApiService>(ApiServiceType).to(ApiService).inSingletonScope();
});

export { IApiService, ApiServiceType } from './api.service';
export { IPersistService, PersistServiceType } from './persist.service';
