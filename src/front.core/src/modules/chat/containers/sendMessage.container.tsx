import * as React from 'react';
import autobind from 'autobind-decorator';

import { ChatStoreType, IChatStore } from '../chat.store';
import { as, injectProps } from '../../../helpers';
import { ChannelsStoreType, IChannelsStore } from '../../channels/channels.store';
import { AuthStoreType, IAuthStore } from '../../auth/auth.store';
import { IChatMessageDto } from 'api.contract';

interface IInjectedProps {
  chatStore: IChatStore;
  channelsStore: IChannelsStore;
  authStore: IAuthStore;
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
})
@autobind
class SendMessageContainer extends React.Component<IProps, IState> {
  state = { body: '' };
  handleBodyChange = (body: string) => this.setState({ body });

  async handleMessageSend() {
    const newMessage: IChatMessageDto = {
      body: this.state.body,
      senderId: this.props.authStore.store.userInfo.id,
      receiverId: this.props.channelsStore.activeChannel!,
      timestamp: new Date(),
      isPrivate: false,
    };
    const secondMessage: IChatMessageDto = {
      body: this.state.body,
      senderId: this.props.authStore.store.userInfo.id,
      receiverId: '7e5ea29e-89c0-4834-bebf-e6db6191bfd7',
      timestamp: new Date(),
      isPrivate: true,
    };

    this.props.chatStore.sendMessage(newMessage);
    this.props.chatStore.sendMessage(secondMessage);
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
