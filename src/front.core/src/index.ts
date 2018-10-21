import 'reflect-metadata';
import { ContainerModule } from 'inversify';
import { storesModule } from './stores/stores.module';
import { servicesModule } from './services/services.module';

export const coreModules: ContainerModule[] = [
  storesModule,
  servicesModule,
];

export * from './helpers/react.helpers';
export * from 'inversify';
export * from './stores/stores.module';
export * from './services/services.module';
export * from './helpers';