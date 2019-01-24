import * as React from 'react';
import autobind from 'autobind-decorator';

import { ChatServiceType, IChatService } from '../chat.service';
import { as, injectProps } from '../../../helpers';
import { ChannelsServiceType, IChannelsService } from '../../channels/channels.service';
import { AuthServiceType, IAuthService } from '../../auth/auth.service';
import { IChatMessageDto } from 'api.contract';
import { ISpacesService, SpacesServiceType } from '../../spaces/spaces.service';
import { withRouter, RouteComponentProps } from 'react-router';

interface IInjectedProps
  extends RouteComponentProps<{ spaceId: string; isPublic: boolean; channelId: string }> {
  chatService: IChatService;
  channelsService: IChannelsService;
  authStore: IAuthService;
  spacesService: ISpacesService;
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
})
@(withRouter as any)
class SendMessageContainer extends React.Component<IProps, IState> {
  state = { body: '' };
  handleBodyChange = (body: string) => this.setState({ body });

  @autobind
  async handleMessageSend() {
    const spaceId = this.props.match.params.spaceId;
    const receiverId = this.props.match.params.channelId;
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.spacesService.store.spaces.find(s => s.id === spaceId)!.members;
    const senderId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    if (this.props.match.params.isPublic) {
      const channelMessage: IChatMessageDto = {
        senderId,
        spaceId,
        receiverId,
        body: this.state.body,
        timestamp: new Date(),
        isPrivate: false,
      };
      this.props.chatService.sendMessage(channelMessage);
    } else {
      const privateMessage: IChatMessageDto = {
        senderId,
        spaceId,
        receiverId,
        body: this.state.body,
        timestamp: new Date(),
        isPrivate: true,
      };
      this.props.chatService.sendMessage(privateMessage);
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
