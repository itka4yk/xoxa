import { ContainerModule, interfaces } from 'inversify';
import { IMembersStore, MembersStoreType, MembersStore } from './members.store';

export const membersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IMembersStore>(MembersStoreType)
    .to(MembersStore)
    .inSingletonScope();
});

export { IMembersStore, MembersStoreType } from './members.store';
