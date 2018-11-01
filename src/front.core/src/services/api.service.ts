import { injectable, inject } from 'inversify';
import axios, { AxiosResponse } from 'axios';
import { ConfigurationType, IEnvSettings } from '../configuration';

export const ApiServiceType = Symbol('API_SERVICE');

export interface IApiService {
  getAsync<TResult>(urlSuffix: string): Promise<TResult | Error>;
  postAsync<TData, TResult>(urlSuffix: string, body?: TData): Promise<TResult | Error>;
}


@injectable()
export class ApiService implements IApiService {
  constructor(@inject(ConfigurationType) private readonly config: IEnvSettings) { }

  getUrl = (urlSuffix: string): string => this.config.baseUrl + urlSuffix;

  async getAsync<TResult>(urlSuffix: string): Promise<TResult | Error> {
    const result: AxiosResponse<TResult> = await axios(this.getUrl(urlSuffix));

    if (result.status !== 200) {
      Promise.reject(new Error(result.statusText));
    }

    return result.data;
  },
  async postAsync<TData, TResult>(urlSuffix: string, body?: TData | undefined): Promise<TResult | Error> {
    const config = { headers: { 'Access-Control-Allow-Origin': '*' } }
    let result: AxiosResponse;
    try {
      result = await axios.post(this.getUrl(urlSuffix), body, config);
      return result.data;
    } catch (error) {
      return error;
    }
  }

}
