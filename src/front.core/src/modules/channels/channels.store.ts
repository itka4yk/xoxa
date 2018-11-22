import { injectable } from 'inversify';
import { persistable } from '../../helpers/persist.helpers';
import { IChannel } from 'api.contract';
import { observable } from 'mobx';

export const ChannelsStoreType = Symbol('CHANNELS_STORE');

export interface IPublicChannel extends IChannel {}
export interface IPrivateChannel {
  receiverId: string;
  name: string;
}

export interface IPrivateChannels {
  [spaceId: string]: IPrivateChannel[];
}
export interface IPublicChannels {
  [spaceId: string]: IPublicChannel[];
}

export enum ChannelStoreState {
  NONE,
  PRIVATE,
  PUBLIC,
}

export interface IChannelsStore {
  privateChannels: IPrivateChannels;
  publicChannels: IPublicChannels;
  state: ChannelStoreState;

  activeChannelId: string | undefined;
}

@persistable()
@injectable()
export class ChannelsStore implements IChannelsStore {
  @observable privateChannels: IPrivateChannels = {};
  @observable publicChannels: IPublicChannels = {};
  @observable state: ChannelStoreState = ChannelStoreState.NONE;
  @observable activeChannelId: string | undefined;
}
