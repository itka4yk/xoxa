import { inject, injectable } from 'inversify';
import { action, autorun, computed } from 'mobx';
import { IChannel, ICreateNewChannelDto, IMemberInfo } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IMembersService, MembersServiceType } from '../members/members.service';
import { ChannelsStoreType, ChannelStoreState, IChannelsStore } from './channels.store';

export const ChannelsServiceType = Symbol('CHANNELS_SERVICE');

export interface IChannelsService {
  state: ChannelStoreState;
  store: IChannelsStore;
  createNewChannel(newChannelName: ICreateNewChannelDto): void;
  getChannels(spaceId: string): void;
  setActivePublicChannel(channelId: string): void;
  setActivePrivateChannel(receiverId: string): void;
  setNoneChannel(): void;

  setChannels(spaceId: string, channels: IChannel[]): void;
}

@injectable()
export class ChannelsService implements IChannelsService {
  @inject(ChannelsStoreType) store!: IChannelsStore;

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(MembersServiceType) private readonly membersService!: IMembersService;

  onActivation() {
    autorun(() => {
      Object.keys(this.membersService.store.members).forEach((spaceId: string) => {
        this.store.privateChannels[spaceId] = this.membersService.store.members[spaceId].map(
          (m: IMemberInfo) => ({
            receiverId: m.id,
            name: m.name,
          }),
        );
      });
    });
  }

  @action
  async getChannels(spaceId: string) {
    const result = await this.apiService.getAsync<IChannel[]>(`/channels?spaceId=${spaceId}`);
    if (result instanceof Error) throw result;
    this.store.publicChannels[spaceId] = result;
  }

  @action
  async createNewChannel(newChannel: ICreateNewChannelDto) {
    await this.apiService.postAsync('/channels', newChannel);
  }

  @action
  setNoneChannel() {
    this.store.state = ChannelStoreState.NONE;
  }

  @action.bound
  setActivePublicChannel(id: string): void {
    this.store.activeChannelId = id;
    this.store.state = ChannelStoreState.PUBLIC;
  }

  @action.bound
  setActivePrivateChannel(receiverId: string): void {
    this.store.activeChannelId = receiverId;
    this.store.state = ChannelStoreState.PRIVATE;
  }

  @action
  setChannels(spaceId: string, channels: IChannel[]): void {
    this.store.publicChannels[spaceId] = channels;
  }

  @computed
  get state() {
    return this.store.state;
  }
}
