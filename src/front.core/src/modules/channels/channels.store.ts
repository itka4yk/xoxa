import { inject, injectable } from 'inversify';
import { action, computed, observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IChannel, ICreateNewChannelDto } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';

export const ChannelsStoreType = 'CHANNELS_STORE_TYPE';

interface IChannelsData {
  [spaceId: string]: IChannel[];
}

export interface IChannelsStore {
  channels: IChannelsData;
  createNewChannel(newChannelName: ICreateNewChannelDto): void;
  getChannels(spaceId: string): void;

  activeChannel: string | undefined;

  setActiveChannel(id: string): void;
}

@persistable()
@injectable()
export class ChannelsStore implements IChannelsStore {
  @observable channels: IChannelsData = {};
  @observable activeChannel: string | undefined;

  @inject(ApiServiceType) private readonly apiService!: IApiService;

  onActivation() {}

  @computed
  get allChannels() {
    return this.channels;
  }

  @action
  async getChannels(spaceId: string) {
    const result = await this.apiService.getAsync<IChannel[]>(`/channels?spaceId=${spaceId}`);
    if (result instanceof Error) return;
    this.channels[spaceId] = result;
  }

  @action
  async createNewChannel(newChannel: ICreateNewChannelDto) {
    await this.apiService.postAsync('/channels', newChannel);
  }

  @action
  setActiveChannel(id: string): void {
    this.activeChannel = id;
  }
}
