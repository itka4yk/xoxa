import { persistable } from '../../helpers';
import { action, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { IChatMessageDto, IMessage } from 'api.contract';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';

export const ChatStoreType = Symbol.for('CHAT_STORE');

export interface IChatStore {
  data: IChatData;

  sendMessage(msg: IChatMessageDto): void;
}

interface IChatData {
  privateMessages: IMessage[];
  channelMessages: { [channelId: string]: IMessage[] };
}

@persistable()
class ChatData implements IChatData {
  @observable channelMessages: { [p: string]: IMessage[] } = {};
  @observable privateMessages: IMessage[] = [];
}

@injectable()
export class ChatStore implements IChatStore {
  data: IChatData;

  constructor(@inject(SocketsServiceType) private readonly sockets: ISocketsService) {
    this.sockets.setMessageCallback(this.newMessage.bind(this));
    this.data = new ChatData();
  }

  @action
  sendMessage(msg: IChatMessageDto) {
    this.sockets.send(msg);
  }

  @action
  newMessage(msg: IChatMessageDto) {
    if (msg.isPrivate) {
      this.data.privateMessages.unshift(msg);
    } else {
      if (!this.data.channelMessages[msg.receiverId]) {
        this.data.channelMessages[msg.receiverId] = [];
      }
      this.data.channelMessages[msg.receiverId].unshift(msg);
    }
  }
}
