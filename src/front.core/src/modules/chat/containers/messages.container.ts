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

interface IInjectedProps {
  chatService: IChatService;
  channelService: IChannelsService;
  authStore: IAuthService;
  spacesService: ISpacesService;
  membersService: IMembersService;
}

interface IProps extends IInjectedProps {}

interface IExtendedMessage extends IChatMessageDto {
  mine: boolean;
  name: string;
}

export interface IMessagesListProps {
  messages: IExtendedMessage[];
}

@injectProps({
  membersService: MembersServiceType,
  authStore: AuthServiceType,
  chatService: ChatServiceType,
  channelService: ChannelsServiceType,
  spacesService: SpacesServiceType,
})
@observer
class MessagesContainer extends React.Component<IProps> {
  render() {
    let messages: IExtendedMessage[] = [];
    const channelId = this.props.channelService.store.activeChannelId;
    const spaceId = this.props.spacesService.store.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersService.store.members[spaceId];
    const myMemberId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    debugger;
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
      } as IMessagesListProps),
    );
    return childrenWithProps;
  }
}

export default as<React.ComponentClass>(MessagesContainer);
