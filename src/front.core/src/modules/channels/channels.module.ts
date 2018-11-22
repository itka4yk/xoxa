import { ContainerModule, interfaces } from 'inversify';
import { IChannelsService, ChannelsServiceType, ChannelsService } from './channels.service';
import { ChannelsStore, ChannelsStoreType, IChannelsStore } from './channels.store';

export const channelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IChannelsService>(ChannelsServiceType)
    .to(ChannelsService)
    .inSingletonScope()
    .onActivation((c, i: any) => {
      i.onActivation();
      return i;
    });
  bind<IChannelsStore>(ChannelsStoreType)
    .to(ChannelsStore)
    .inSingletonScope();
});

export { IChannelsService, ChannelsServiceType } from './channels.service';
export { IChannelsStore, ChannelsStoreType } from './channels.store';
export * from './containers';
