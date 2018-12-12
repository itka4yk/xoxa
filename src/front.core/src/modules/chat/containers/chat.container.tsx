import * as React from 'react';
import { observer } from 'mobx-react';
import { ChatServiceType, IChatService } from '../chat.service';
import { as, injectProps } from '../../../helpers';
import { ChannelsServiceType, IChannelsService } from '../../channels/channels.service';
import { AuthServiceType, IAuthService } from '../../auth/auth.service';
import { IChatMessageDto } from 'api.contract';
import { IMembersService, MembersServiceType } from '../../members/members.service';
import { ChannelStoreState } from '../../channels/channels.store';
import { ISpacesService, SpacesServiceType } from '../../spaces/spaces.service';
import autobind from 'autobind-decorator';

interface IInjectedProps {
  chatService: IChatService;
  channelService: IChannelsService;
  authStore: IAuthService;
  spacesService: ISpacesService;
  membersService: IMembersService;
}

interface IProps extends IInjectedProps {}

interface IState {
  body: string;
}

export interface IExtendedMessage extends IChatMessageDto {
  mine: boolean;
  name: string;
}

export interface IChatProps {
  messages: IExtendedMessage[];
  onBodyChange(name: string): void;
  onMessageSend(): void;
}

@injectProps({
  membersService: MembersServiceType,
  authStore: AuthServiceType,
  chatService: ChatServiceType,
  channelService: ChannelsServiceType,
  spacesService: SpacesServiceType,
})
@observer
class ChatContainer extends React.Component<IProps, IState> {
  state = { body: '' };
  handleBodyChange = (body: string) => this.setState({ body });
  @autobind
  async handleMessageSend() {
    const spaceId = this.props.spacesService.store.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersService.store.members[spaceId];
    const senderId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    switch (this.props.channelService.store.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PUBLIC:
        const channelMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelService.store.activeChannelId!,
          timestamp: new Date(),
          isPrivate: false,
        };
        this.props.chatService.sendMessage(channelMessage);
        break;
      case ChannelStoreState.PRIVATE:
        const privateMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelService.store.activeChannelId!,
          timestamp: new Date(),
          isPrivate: true,
        };
        this.props.chatService.sendMessage(privateMessage);
        break;
    }
    this.setState({ body: '' });
  }
  render() {
    let messages: IExtendedMessage[] = [];
    const channelId = this.props.channelService.store.activeChannelId;
    const spaceId = this.props.spacesService.store.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersService.store.members[spaceId];
    const myMemberId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    switch (this.props.channelService.store.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PRIVATE:
        if (channelId) {
          messages = this.props.chatService.store.privateMessages
            .filter(
              m =>
                (m.receiverId === channelId && m.senderId === myMemberId) ||
                (m.receiverId === myMemberId && m.senderId === channelId),
            )
            .map(m => ({
              ...m,
              name: spaceMembers.find(member => member.id === m.senderId)!.name,
              mine: m.senderId === myMemberId && m.receiverId !== myMemberId,
            }));
        }
        break;
      case ChannelStoreState.PUBLIC:
        if (channelId) {
          messages = (this.props.chatService.store.channelMessages[channelId] || []).map(m => ({
            ...m,
            name: spaceMembers.find(member => member.id === m.senderId)!.name,
            mine: m.senderId === myMemberId,
          }));
        }
        break;
      default:
        throw new Error('Unknown state type');
    }
    const childrenWithProps = React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        messages,
        myId: myMemberId,
        onBodyChange: this.handleBodyChange,
        onMessageSend: this.handleMessageSend,
      } as IChatProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(ChatContainer);
