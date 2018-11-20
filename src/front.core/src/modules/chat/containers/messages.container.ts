import * as React from 'react';
import { observer } from 'mobx-react';
import { ChatStoreType, IChatStore } from '../chat.store';
import { as, injectProps } from '../../../helpers';
import {
  ChannelsStoreType,
  ChannelStoreState,
  IChannelsStore,
} from '../../channels/channels.store';
import { AuthStoreType, IAuthStore } from '../../auth/auth.store';
import { IChatMessageDto } from 'api.contract';
import { ISpacesStore, SpacesStoreType } from '../../spaces/spaces.store';
import { IMembersStore, MembersStoreType } from '../../members/members.store';

interface IInjectedProps {
  chatStore: IChatStore;
  channelStore: IChannelsStore;
  authStore: IAuthStore;
  spacesStore: ISpacesStore;
  membersStore: IMembersStore;
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
  membersStore: MembersStoreType,
  authStore: AuthStoreType,
  chatStore: ChatStoreType,
  channelStore: ChannelsStoreType,
  spacesStore: SpacesStoreType,
})
@observer
class MessagesContainer extends React.Component<IProps> {
  render() {
    let messages: IExtendedMessage[] = [];
    const privateChannelId = this.props.channelStore.activePrivateChannel;
    const spaceId = this.props.spacesStore.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersStore.members[spaceId];
    const channelId = this.props.channelStore.activeChannel;
    const myMemberId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    switch (this.props.channelStore.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PRIVATE:
        if (privateChannelId) {
          messages = this.props.chatStore.data.privateMessages
            .filter(
              m =>
                (m.receiverId === privateChannelId && m.senderId === myMemberId) ||
                (m.receiverId === myMemberId && m.senderId === privateChannelId),
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
          messages = (this.props.chatStore.data.channelMessages[channelId] || []).map(m => ({
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
