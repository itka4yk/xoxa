import { ContainerModule, interfaces } from 'inversify';
import { ISpacesStore, SpacesStoreType, SpacesStore } from './spaces.store';

export const spacesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ISpacesStore>(SpacesStoreType).to(SpacesStore).inSingletonScope();
});

export { ISpacesStore, SpacesStoreType } from './spaces.store';

