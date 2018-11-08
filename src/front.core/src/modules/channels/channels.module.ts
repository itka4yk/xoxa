import { ContainerModule, interfaces } from 'inversify';
import { IChannelsStore, ChannelsStoreType, ChannelsStore } from './channels.store';

export const channelsModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IChannelsStore>(ChannelsStoreType).to(ChannelsStore).inSingletonScope().onActivation((c, i: any) => {
    i.onActivation();
    return i;
  });
});

export { IChannelsStore, ChannelsStoreType } from './channels.store';
export * from './containers';

