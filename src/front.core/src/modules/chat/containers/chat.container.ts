import * as React from 'react';
import { observer } from 'mobx-react';
import { ChatServiceType, IChatService } from '../chat.service';
import { as, injectProps } from '../../../helpers';
import { ChannelsServiceType, IChannelsService } from '../../channels/channels.service';
import { AuthServiceType, IAuthService } from '../../auth/auth.service';
import { IChatMessageDto } from 'api.contract';

import { ISpacesService, SpacesServiceType } from '../../spaces/spaces.service';
import autobind from 'autobind-decorator';
import { RouteComponentProps, withRouter } from 'react-router';
import { IExtendedMessage, IMessagesListProps } from '.';
import { RouterStoreType } from '../../..';
import { observable } from 'mobx';

// tslint:disable-next-line:max-line-length
interface IInjectedProps extends RouteComponentProps<{ spaceId: string; isPublic: boolean; channelId: string }> {
    chatService: IChatService;
    channelService: IChannelsService;
    authStore: IAuthService;
    spacesService: ISpacesService;
    router: any;
}

interface IProps extends IInjectedProps { }

interface IState {
  body: string;
}

export interface IChatProps {
  messages: IExtendedMessage[];
  onBodyChange(name: string): void;
  onMessageSend(): void;
}

@injectProps({
  authStore: AuthServiceType,
  chatService: ChatServiceType,
  channelService: ChannelsServiceType,
  spacesService: SpacesServiceType,
  router: RouterStoreType,
})
@observer
class ChatContainer extends React.Component<IProps, IState> {
  @observable channelId: string = this.props.match.params.channelId;
  @observable spaceId: string = this.props.match.params.spaceId;
  @observable isPublic: boolean = this.props.match.params.isPublic;

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

  componentWillReceiveProps(newProps: IProps) {
    const { channelId, isPublic, spaceId } = newProps.match.params;
    this.props.chatService.requestMessages(channelId, spaceId, isPublic);
    this.channelId = channelId;
    this.isPublic = isPublic;
    this.spaceId = spaceId;
  }

  render() {
    console.log('RENDER', this);
    let messages: IExtendedMessage[] = [];
    const senderUserId = this.props.authStore.store.userInfo.id;
    const spaceMembers = this.props.spacesService.store.spaces.find(s => s.id === this.spaceId)!
      .members;
    const myMemberId = spaceMembers.find(m => m.userId === senderUserId)!.id;
    const channelMessages = this.props.chatService.store.channelMessages;
    const privateMessages = this.props.chatService.store.privateMessages;
    if (this.isPublic) {
      messages = (channelMessages[this.channelId] || [])
        .map(m => ({
          ...m,
          name: spaceMembers.find(member => member.id === m.senderId)!.name,
          mine: m.senderId === myMemberId,
        }))
        .slice() as any;
    } else {
      messages = privateMessages
        .filter(
          m =>
            (m.receiverId === this.channelId && m.senderId === myMemberId) ||
            (m.receiverId === myMemberId && m.senderId === this.channelId),
        )
        .map(m => ({
          ...m,
          name: spaceMembers.find(member => member.id === m.senderId)!.name,
          mine: m.senderId === myMemberId && m.receiverId !== myMemberId,
        }))
        .slice() as any;
    }
    return React.Children.map(this.props.children, (child: any) =>
      React.cloneElement(child, {
        messages,
        onBodyChange: this.handleBodyChange,
        onMessageSend: this.handleMessageSend,
      } as IChatProps),
    );
  }
}

export default as<React.ComponentClass>(withRouter(ChatContainer));
