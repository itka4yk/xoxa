import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import { ConfigurationType, IEnvSettings } from '../configuration';

export const ApiServiceType = Symbol('API_SERVICE');

export interface IApiService {
  getAsync<TResult>(urlSuffix: string): Promise<TResult | Error>;
  postAsync<TData>(urlSuffix: string, body?: TData): Promise<void | Error>;
}

@injectable()
export class ApiService implements IApiService {
  constructor(@inject(ConfigurationType) private readonly config: IEnvSettings) {}

  // FIXME: fix configuration file
  private getUrl = (urlSuffix: string): string => this.config.baseUrl + urlSuffix;

  async getAsync<TResult>(urlSuffix: string): Promise<TResult | Error> {
    const result: AxiosResponse<TResult> = await axios(this.getUrl(urlSuffix));

    if (result.status !== 200) {
      Promise.reject(new Error(result.statusText));
    }

    return result.data;
  }

  async postAsync<TData>(urlSuffix: string, body?: TData | undefined): Promise<void | Error> {
    const result: AxiosResponse = await axios.post(this.getUrl(urlSuffix), body);

    if (result.status !== 200 && result.status !== 201) {
      Promise.reject(new Error(result.statusText));
    }
  }
}
