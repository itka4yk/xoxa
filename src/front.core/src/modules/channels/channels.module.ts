import { ContainerModule, interfaces } from 'inversify';
import { IChannelsService, ChannelsServiceType, ChannelsService } from './channels.service';

export const channelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IChannelsService>(ChannelsServiceType)
    .to(ChannelsService)
    .inSingletonScope();
});

export { IChannelsService, ChannelsServiceType } from './channels.service';
export * from './containers';
