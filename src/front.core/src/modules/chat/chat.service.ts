import { action, observable } from 'mobx';
import { inject, injectable } from 'inversify';
import { IChatMessageDto, IMessage } from 'api.contract';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';
import { ChatStoreType, IChatStore } from './chat.store';
import { ApiServiceType, IApiService } from '../../services/api.service';

export const ChatServiceType = Symbol.for('CHAT_SERVICE');

export interface IChatService {
  store: IChatStore;
  sendMessage(msg: IChatMessageDto): void;
  requestMessages(channelId: string, spaceId: string, isPublic: boolean): void;
}

@injectable()
export class ChatService implements IChatService {
  @inject(ChatStoreType) @observable store!: IChatStore;

  constructor(
    @inject(SocketsServiceType) private readonly sockets: ISocketsService,
    @inject(ApiServiceType) private readonly apiService: IApiService,
  ) {
    this.sockets.setMessageCallback(this.newMessage.bind(this));
  }

  @action
  async requestChannelsMessages(channelId: string, spaceId: string) {
    const url = `/messages/channel?receiverId=${channelId}&spaceId=${spaceId}`;
    const result = await this.apiService.getAsync<IMessage[]>(url);
    if (result instanceof Error) throw result;
    this.store.channelMessages[channelId] = [...result];
  }

  @action
  async requestPrivateMessages(firstId: string, secondId: string) {
    const url = `/messages/private?firstId=${firstId}&secondId=${secondId}`;
    const result = await this.apiService.getAsync<IMessage[]>(url);
    if (result instanceof Error) throw result;
    this.store.privateMessages = result;
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

  @action
  requestMessages(channelId: string, spaceId: string, isPublic: boolean): void {
    if (isPublic) {
      this.requestChannelsMessages(channelId, spaceId);
    } else {
      // this.requestChannelsMessages(channelId, spaceId, spaceId);
    }
  }
}
