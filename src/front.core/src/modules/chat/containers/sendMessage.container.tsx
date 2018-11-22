import * as React from 'react';
import autobind from 'autobind-decorator';

import { ChatServiceType, IChatService } from '../chat.service';
import { as, injectProps } from '../../../helpers';
import {
  ChannelsServiceType,
  IChannelsService,
} from '../../channels/channels.service';
import { AuthServiceType, IAuthService } from '../../auth/auth.service';
import { IChatMessageDto } from 'api.contract';
import { IMembersService, MembersServiceType } from '../../members/members.service';
import { ChannelStoreState } from '../../channels/channels.store';
import { ISpacesService, SpacesServiceType } from '../../spaces/spaces.service';

interface IInjectedProps {
  chatService: IChatService;
  channelsService: IChannelsService;
  authStore: IAuthService;
  spacesService: ISpacesService;
  membersService: IMembersService;
}

interface IState {
  body: string;
}

interface IProps extends IInjectedProps {}

export interface ISendMessageForm {
  onBodyChange(name: string): void;
  onMessageSend(): void;
}

@injectProps({
  chatService: ChatServiceType,
  channelsService: ChannelsServiceType,
  authStore: AuthServiceType,
  spacesService: SpacesServiceType,
  membersService: MembersServiceType,
})
class SendMessageContainer extends React.Component<IProps, IState> {
  state = { body: '' };
  handleBodyChange = (body: string) => this.setState({ body });

  @autobind
  async handleMessageSend() {
    const spaceId = this.props.spacesService.store.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersService.store.members[spaceId];
    const senderId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    switch (this.props.channelsService.store.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PUBLIC:
        const channelMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelsService.store.activeChannelId!,
          timestamp: new Date(),
          isPrivate: false,
        };
        this.props.chatService.sendMessage(channelMessage);
        break;
      case ChannelStoreState.PRIVATE:
        const privateMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelsService.store.activeChannelId!,
          timestamp: new Date(),
          isPrivate: true,
        };
        this.props.chatService.sendMessage(privateMessage);
        break;
    }
    this.setState({ body: '' });
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        onBodyChange: this.handleBodyChange,
        onMessageSend: this.handleMessageSend,
      } as ISendMessageForm),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(SendMessageContainer);
