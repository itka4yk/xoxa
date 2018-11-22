import { action } from 'mobx';
import { inject, injectable } from 'inversify';
import { IChatMessageDto } from 'api.contract';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';
import { ChatStoreType, IChatStore } from './chat.store';

export const ChatServiceType = Symbol.for('CHAT_SERVICE');

export interface IChatService {
  store: IChatStore;
  sendMessage(msg: IChatMessageDto): void;
}

@injectable()
export class ChatService implements IChatService {
  @inject(ChatStoreType) store!: IChatStore;

  constructor(@inject(SocketsServiceType) private readonly sockets: ISocketsService) {
    this.sockets.setMessageCallback(this.newMessage.bind(this));
  }

  @action
  sendMessage(msg: IChatMessageDto) {
    this.sockets.send(msg);
  }

  @action
  newMessage(msg: IChatMessageDto) {
    if (msg.isPrivate) {
      this.store.privateMessages.unshift(msg);
    } else {
      if (!this.store.channelMessages[msg.receiverId]) {
        this.store.channelMessages[msg.receiverId] = [];
      }
      this.store.channelMessages[msg.receiverId].unshift(msg);
    }
  }
}
