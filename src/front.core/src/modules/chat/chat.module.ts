import { ContainerModule, interfaces } from 'inversify';
import { ChatStore, ChatStoreType, IChatStore } from './chat.store';

export const chatModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IChatStore>(ChatStoreType).to(ChatStore).inSingletonScope();
});

export { IChatStore, ChatStoreType } from './chat.store';
export * from './containers';
