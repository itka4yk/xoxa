import * as React from 'react';
import autobind from 'autobind-decorator';

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
  channelsStore: IChannelsStore;
  authStore: IAuthStore;
  spacesStore: ISpacesStore;
  membersStore: IMembersStore;
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
  chatStore: ChatStoreType,
  channelsStore: ChannelsStoreType,
  authStore: AuthStoreType,
  spacesStore: SpacesStoreType,
  membersStore: MembersStoreType,
})
class SendMessageContainer extends React.Component<IProps, IState> {
  state = { body: '' };
  handleBodyChange = (body: string) => this.setState({ body });

  @autobind
  async handleMessageSend() {
    const spaceId = this.props.spacesStore.activeSpace!;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.membersStore.members[spaceId];
    const senderId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    switch (this.props.channelsStore.state) {
      case ChannelStoreState.NONE:
        break;
      case ChannelStoreState.PUBLIC:
        const channelMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelsStore.activeChannel!,
          timestamp: new Date(),
          isPrivate: false,
        };
        this.props.chatStore.sendMessage(channelMessage);
        break;
      case ChannelStoreState.PRIVATE:
        const privateMessage: IChatMessageDto = {
          senderId,
          body: this.state.body,
          receiverId: this.props.channelsStore.activePrivateChannel!,
          timestamp: new Date(),
          isPrivate: true,
        };
        this.props.chatStore.sendMessage(privateMessage);
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
