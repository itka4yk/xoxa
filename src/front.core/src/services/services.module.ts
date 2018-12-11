import { ContainerModule, interfaces } from 'inversify';
import { ApiService, ApiServiceType, IApiService } from './api.service';
import { ISocketsService, SocketsService, SocketsServiceType } from './sockets.service';
import { IPersistService, PersistServiceType, PersistService } from './persist.service';

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IApiService>(ApiServiceType)
    .to(ApiService)
    .inSingletonScope();
  bind<ISocketsService>(SocketsServiceType)
    .to(SocketsService)
    .inSingletonScope();
  bind<IPersistService>(PersistServiceType).to(PersistService);
});

export { IApiService, ApiServiceType } from './api.service';
export { ISocketsService, SocketsServiceType } from './sockets.service';
