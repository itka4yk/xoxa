import * as React from 'react';
import { observer } from 'mobx-react';
import { ChatStoreType, IChatStore } from '../chat.store';
import { as, injectProps } from '../../../helpers';
import { ChannelsStoreType, IChannelsStore } from '../../channels/channels.store';
import { AuthStoreType, IAuthStore } from '../../auth/auth.store';
import { IChatMessageDto } from 'api.contract';

interface IInjectedProps {
  chatStore: IChatStore;
  channelStore: IChannelsStore;
  authStore: IAuthStore;
}

interface IProps extends IInjectedProps {}

interface IExtendedMessage extends IChatMessageDto {
  mine: boolean;
}

export interface IMessagesListProps {
  messages: IExtendedMessage[];
}

@injectProps({
  authStore: AuthStoreType,
  chatStore: ChatStoreType,
  channelStore: ChannelsStoreType,
})
@observer
class MessagesContainer extends React.Component<IProps> {
  render() {
    const channelId = this.props.channelStore.activeChannel;
    const userId = this.props.authStore.store.userInfo.id;
    let messages: IExtendedMessage[] = [];
    if (channelId) {
      messages = (this.props.chatStore.data.channelMessages[channelId] || []).map(m => ({
        ...m,
        mine: m.senderId === userId,
      }));
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
