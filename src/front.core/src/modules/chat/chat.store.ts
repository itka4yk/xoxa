import { IMessage } from 'api.contract';
import { injectable } from 'inversify';
import { observable } from 'mobx';
import { persistable } from '../../helpers/persist.helpers';

export const ChatStoreType = Symbol('CHAT_STORE');

export interface IChatStore {
  privateMessages: IMessage[];
  channelMessages: { [channelId: string]: IMessage[] };
}

@persistable()
@injectable()
export class ChatStore implements IChatStore {
  @observable channelMessages: { [p: string]: IMessage[] } = {};
  @observable privateMessages: IMessage[] = [];
}
