import { persistable } from '../../helpers';
import { action, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { IChatMessageDto, IMessage } from 'api.contract';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';

export const ChatStoreType = Symbol.for('CHAT_STORE');

interface IMessagesData {
  [channelId: string]: IMessage[];
}

export interface IChatStore {
  data: IChatData;

  sendMessage(msg: IChatMessageDto): void;
}

interface IChatData {
  messages: IMessagesData;
}

@persistable()
class ChatData implements IChatData {
  @observable messages: IMessagesData = {};
}

@injectable()
export class ChatStore implements IChatStore {
  data: IChatData = new ChatData();

  constructor(@inject(SocketsServiceType) private readonly sockets: ISocketsService) {
    this.sockets.setMessageCallback(this.newMessage);
  }

  @action
  sendMessage(msg: IChatMessageDto) {
    console.log(msg);
    this.sockets.send(msg);
  }

  @action
  newMessage(msg: IChatMessageDto) {
    console.log('NEW MESSAGE!!!', msg);
  }
}