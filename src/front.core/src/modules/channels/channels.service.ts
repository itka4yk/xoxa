import { inject, injectable } from 'inversify';
import { action } from 'mobx';
import { ICreateNewChannelDto } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';

export const ChannelsServiceType = Symbol('CHANNELS_SERVICE');

export interface IChannelsService {
  createNewChannel(newChannelName: ICreateNewChannelDto): void;
}

@injectable()
export class ChannelsService implements IChannelsService {
  @inject(ApiServiceType) private readonly apiService!: IApiService;

  @action
  async createNewChannel(newChannel: ICreateNewChannelDto) {
    await this.apiService.postAsync('/channels', newChannel);
  }
}
