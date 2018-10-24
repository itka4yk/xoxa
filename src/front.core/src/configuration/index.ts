import dev from './config.dev';
import ci from './config.ci';
import prod from './config.prod';
import { ContainerModule, interfaces } from 'inversify';

declare var process: {
  env: {
    NODE_ENV: string;
    PLATFORM_ENV: string;
    CI_COMMIT_REF_SLUG: string;
  };
};

export interface IEnvSettings {
  readonly baseUrl: string;
  readonly authUrl: string;
}

let configuration: IEnvSettings;

switch (process.env.NODE_ENV) {
  case 'development':
    configuration = dev;
    break;
  case 'ci':
    configuration = ci;
    break;
  default:
    configuration = prod;
    break;
}
export const ConfigurationType = Symbol('CONFIGURATION');

export const configurationModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IEnvSettings>(ConfigurationType).toConstantValue(configuration);
});
