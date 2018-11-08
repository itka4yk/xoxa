import { ContainerModule, interfaces } from 'inversify';
import { ISpacesStore, SpacesStoreType, SpacesStore } from './spaces.store';

export const spacesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ISpacesStore>(SpacesStoreType).to(SpacesStore).inSingletonScope().onActivation((c, i: any) => {
    i.onActivation();
    return i;
  });
});

export { ISpacesStore, SpacesStoreType } from './spaces.store';
export * from './containers';

