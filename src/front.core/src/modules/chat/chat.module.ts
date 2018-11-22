import { ContainerModule, interfaces } from 'inversify';
import { ChatService, ChatServiceType, IChatService } from './chat.service';
import { ChatStore, ChatStoreType, IChatStore } from './chat.store';

export const chatModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IChatService>(ChatServiceType)
    .to(ChatService)
    .inSingletonScope();
  bind<IChatStore>(ChatStoreType)
    .to(ChatStore)
    .inSingletonScope();
});

export { IChatService, ChatServiceType } from './chat.service';
export { IChatStore, ChatStoreType } from './chat.store';
export * from './containers';
