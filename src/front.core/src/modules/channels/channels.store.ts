import { injectable, inject } from 'inversify';
import { observable, computed, action, autorun, reaction, when } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IMySpace, ICreateNewChannelDto, IChannel } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/services.module';
import { RouterStoreType, IRouterStore } from '../../stores/stores.module';

export const ChannelsStoreType = 'CHANNELS_STORE_TYPE';

export interface IChannelsStore {
  createNewChannel(newChannelName: ICreateNewChannelDto): void;
  getChannels(spaceId: string): void;
  channels: IChannel[];
}

@injectable()
export class ChannelsStore implements IChannelsStore {
  @observable private _channels: IChannel[] = [];

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(RouterStoreType) private readonly routerStore!: IRouterStore;

  onActivation() {
  }

  @computed
  get channels() {
    return this._channels.map(s => s);
  }

  @action
  async getChannels(spaceId: string) {
    const result = await this.apiService.getAsync<IChannel[]>(`/channels?spaceId=${spaceId}`);
    console.log('CHANNELS', result);
    if (result instanceof Error) return;
    this._channels = result;
  }

  @action
  async createNewChannel(newChannel: ICreateNewChannelDto) {
    await this.apiService.postAsync('/channels', newChannel);
  }
}
