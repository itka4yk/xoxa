import { action, autorun } from 'mobx';
import { inject, injectable } from 'inversify';
import { IChatMessageDto, IMessage } from 'api.contract';
import { ISocketsService, SocketsServiceType } from '../../services/sockets.service';
import { ChatStoreType, IChatStore } from './chat.store';
import { ChannelsServiceType, IChannelsService } from '../channels/channels.service';
import { ChannelStoreState } from '../channels/channels.store';
import { ApiServiceType, IApiService } from '../../services/api.service';
import { IMembersService, MembersServiceType } from '../members/members.service';

export const ChatServiceType = Symbol.for('CHAT_SERVICE');

export interface IChatService {
  store: IChatStore;
  sendMessage(msg: IChatMessageDto): void;
}

@injectable()
export class ChatService implements IChatService {
  @inject(ChatStoreType) store!: IChatStore;

  constructor(
    @inject(SocketsServiceType) private readonly sockets: ISocketsService,
    @inject(ChannelsServiceType) private readonly channelsService: IChannelsService,
    @inject(ApiServiceType) private readonly apiService: IApiService,
    @inject(MembersServiceType) private readonly membersService: IMembersService,
  ) {
    this.sockets.setMessageCallback(this.newMessage.bind(this));
  }

  onChannelChange = autorun(() => {
    switch (this.channelsService.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PRIVATE:
        const privateId = this.channelsService.store.activeChannelId;
        this.requestPrivateMessages(privateId!, this.membersService.activeSpaceMemberId);
        break;
      case ChannelStoreState.PUBLIC:
        const channelId = this.channelsService.store.activeChannelId;
        this.requestChannelsMessages(channelId!);
        break;
    }
  });

  @action
  async requestChannelsMessages(channelId: string) {
    const url = `/messages/channel?receiverId=${channelId}`;
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
}
