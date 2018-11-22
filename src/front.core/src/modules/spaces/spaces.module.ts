import { ContainerModule, interfaces } from 'inversify';
import { ISpacesStore, SpacesStoreType, SpacesStore } from './spaces.store';
import { ISpacesService, SpacesService, SpacesServiceType } from './spaces.service';

export const spacesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ISpacesStore>(SpacesStoreType)
    .to(SpacesStore)
    .inSingletonScope();
  bind<ISpacesService>(SpacesServiceType)
    .to(SpacesService)
    .inSingletonScope()
    .onActivation((c, i: any) => {
      i.onActivation();
      return i;
    });
});

export { ISpacesStore, SpacesStoreType } from './spaces.store';
export * from './containers';
