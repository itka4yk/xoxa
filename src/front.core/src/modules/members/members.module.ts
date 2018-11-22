import { ContainerModule, interfaces } from 'inversify';
import { IMembersStore, MembersStoreType, MembersStore } from './members.store';
import { IMembersService, MembersService, MembersServiceType } from './members.service';

export const membersModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IMembersStore>(MembersStoreType)
    .to(MembersStore)
    .inSingletonScope();
  bind<IMembersService>(MembersServiceType)
    .to(MembersService)
    .inSingletonScope();
});

export { IMembersStore, MembersStoreType } from './members.store';
export { IMembersService, MembersServiceType } from './members.service';
export * from './containers';
