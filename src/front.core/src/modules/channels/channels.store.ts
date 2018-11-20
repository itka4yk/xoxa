import { inject, injectable } from 'inversify';
import { action, computed, observable, autorun } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';
import { IChannel, ICreateNewChannelDto, IMemberInfo } from 'api.contract';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IMembersStore, MembersStoreType } from '../members/members.store';

export const ChannelsStoreType = 'CHANNELS_STORE_TYPE';

interface IPrivateChannel {
  receiverId: string;
}

interface IPrivateChannelData {
  [spaceId: string]: IPrivateChannel[];
}

interface IChannelsData {
  [spaceId: string]: IChannel[];
}

export enum ChannelStoreState {
  NONE,
  PRIVATE,
  PUBLIC,
}

export interface IChannelsStore {
  channels: IChannelsData;
  state: ChannelStoreState;
  createNewChannel(newChannelName: ICreateNewChannelDto): void;
  getChannels(spaceId: string): void;

  activeChannel: string | undefined;
  activePrivateChannel: string | undefined;

  setActiveChannel(channelId: string): void;
  setActivePrivateChannel(receiverId: string): void;
}

@persistable()
@injectable()
export class ChannelsStore implements IChannelsStore {
  @observable channels: IChannelsData = {};
  @observable privateChannels: IPrivateChannelData = {};
  @observable activeChannel: string | undefined;
  @observable activePrivateChannel: string | undefined;
  @observable state: ChannelStoreState = ChannelStoreState.NONE;

  @inject(ApiServiceType) private readonly apiService!: IApiService;
  @inject(MembersStoreType) private readonly membersStore!: IMembersStore;

  onActivation() {
    autorun(() => {
      Object.keys(this.membersStore.members).forEach((spaceId: string) => {
        this.privateChannels[spaceId] = this.membersStore.members[spaceId].map(
          (m: IMemberInfo) => ({
            receiverId: m.id,
          }),
        );
      });
    });
  }

  @computed
  get allChannels() {
    return this.channels;
  }

  @action
  async getChannels(spaceId: string) {
    const result = await this.apiService.getAsync<IChannel[]>(`/channels?spaceId=${spaceId}`);
    if (result instanceof Error) throw result;
    this.channels[spaceId] = result;
  }

  @action
  async createNewChannel(newChannel: ICreateNewChannelDto) {
    await this.apiService.postAsync('/channels', newChannel);
  }

  @action.bound
  setActiveChannel(id: string): void {
    this.activeChannel = id;
    this.state = ChannelStoreState.PUBLIC;
  }

  @action.bound
  setActivePrivateChannel(receiverId: string): void {
    this.activePrivateChannel = receiverId;
    this.state = ChannelStoreState.PRIVATE;
  }
}
