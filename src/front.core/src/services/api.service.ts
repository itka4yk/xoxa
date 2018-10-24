import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import { ConfigurationType, IEnvSettings } from '../configuration';

export const ApiServiceType = Symbol('API_SERVICE');

interface IRequests {
  getAsync<TResult>(urlSuffix: string): Promise<TResult | Error>;
  postAsync<TData, TResult>(urlSuffix: string, body?: TData): Promise<TResult | Error>;
}

export interface IApiService {
  api(): IRequests;
  auth(): IRequests;
}


@injectable()
export class ApiService implements IApiService {
  constructor(@inject(ConfigurationType) private readonly config: IEnvSettings) {}

  auth = () => this.requests(this.config.authUrl);
  api = () => this.requests(this.config.baseUrl);

  private requests(baseUrl: string): IRequests {
    const getUrl = (urlSuffix: string): string => baseUrl + urlSuffix;
    return {
      async getAsync<TResult>(urlSuffix: string): Promise<TResult | Error> {
        const result: AxiosResponse<TResult> = await axios(getUrl(urlSuffix));

        if (result.status !== 200) {
          Promise.reject(new Error(result.statusText));
        }

        return result.data;
      },
      async postAsync<TData, TResult>(urlSuffix: string, body?: TData | undefined): Promise<TResult | Error> {
        const config = { headers: { 'Access-Control-Allow-Origin': '*'}}
        let result: AxiosResponse;
        try {
          result = await axios.post(getUrl(urlSuffix), body, config);
          return result.data;
        } catch (error) {
          return error;
        }
      }
    }
  }
}
