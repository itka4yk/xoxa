import { ContainerModule, interfaces } from 'inversify';
import { ApiService, ApiServiceType, IApiService } from './api.service';
import { IPersistService, PersistService, PersistServiceType } from './persist.service';
import { ISocketsService, SocketsService, SocketsServiceType } from './sockets.service';

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IPersistService>(PersistServiceType).to(PersistService);
  bind<IApiService>(ApiServiceType).to(ApiService).inSingletonScope();
  bind<ISocketsService>(SocketsServiceType).to(SocketsService).inSingletonScope();
});

export { IApiService, ApiServiceType } from './api.service';
export { IPersistService, PersistServiceType } from './persist.service';
export { ISocketsService, SocketsServiceType } from './sockets.service';
