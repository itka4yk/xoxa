import * as React from 'react';
import { observer } from 'mobx-react';
import { ChatServiceType, IChatService } from '../chat.service';
import { as, injectProps } from '../../../helpers';
import { ChannelsServiceType, IChannelsService, AuthServiceType, IAuthService } from '../..';
import { IChatMessageDto } from 'api.contract';
import { ISpacesService, SpacesServiceType } from '../../spaces/spaces.service';
import { IMessagesListProps } from './messages.container';
import { RouteComponentProps, withRouter } from 'react-router';
import { RouterStoreType } from '../../..';
import { observable } from 'mobx';

interface IInjectedProps  // @ts-ignore
  extends RouteComponentProps<{ spaceId: string; isPublic: boolean; channelId: string }> {
  chatService: IChatService;
  channelService: IChannelsService;
  authStore: IAuthService;
  spacesService: ISpacesService;
  router: any;
}

interface IProps extends IInjectedProps {}

export interface IExtendedMessage extends IChatMessageDto {
  mine: boolean;
  name: string;
}

export interface IMessagesListProps {
  messages: IExtendedMessage[];
}

@injectProps({
  authStore: AuthServiceType,
  chatService: ChatServiceType,
  channelService: ChannelsServiceType,
  spacesService: SpacesServiceType,
  router: RouterStoreType,
})
@(withRouter as any)
@observer
class MessagesContainer extends React.Component<IProps> {
  @observable channelId: string = this.props.match.params.channelId;
  @observable spaceId: string = this.props.match.params.spaceId;
  @observable isPublic: boolean = this.props.match.params.isPublic;

  componentWillReceiveProps(newProps: IProps) {
    const { channelId, isPublic, spaceId } = newProps.match.params;
    this.props.chatService.requestMessages(channelId, spaceId, isPublic);
    this.channelId = channelId;
    this.isPublic = isPublic;
    this.spaceId = spaceId;
  }

  render() {
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
      } as IMessagesListProps),
    );
  }
}

export default as<React.ComponentClass>(MessagesContainer);
