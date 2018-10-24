import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import { storesModule } from './stores/stores.module';
import { servicesModule } from './services/services.module';
import { configurationModule } from './configuration';
import { authModule } from './modules';

export const coreModules: ContainerModule[] = [
  servicesModule,
  storesModule,
  configurationModule,
  authModule
];

export * from './helpers/react.helpers';
export * from './modules';
export * from './stores/stores.module';
export * from './services/services.module';
export * from './helpers';
export * from './models';