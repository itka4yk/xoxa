import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../events/receivedMessage.event';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesRepository } from '../../infrastructure/repositories/messages.repository';
import { IMessageState } from '../../domain/messages/message';
import { ClientsService } from '../../infrastructure/clients.service';
import { SpacesRepository } from '../../infrastructure/repositories/spaces.repository';
import { ChannelsRepository } from '../../infrastructure/repositories/channels.repository';

@WebSocketGateway()
@EventsHandler(ReceivedMessageEvent)
export class ReceivedMessageEventHandler
  implements IEventHandler<ReceivedMessageEvent> {
  @WebSocketServer() socket;

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly clientsService: ClientsService,
    private readonly channelsRepository: ChannelsRepository,
    private readonly spacesRepository: SpacesRepository,
  ) {}

  async handle(event: ReceivedMessageEvent) {
    await this.messagesRepository.create(event as IMessageState);
    if (event.isPrivate) {
      await this.sendToClient(event.receiverId, event);
    } else {
      const channel = await this.channelsRepository.getById(event.receiverId);
      const space = await this.spacesRepository.getById(channel.state.spaceId);
      const members = space.state.members;
      members.forEach(c => this.sendToClient(c, event));
    }
  }

  private async sendToClient(clientId: string, event: any) {
    const sockets = await this.clientsService.getSocketId(clientId);
    sockets.forEach((socketId: string) => {
      this.socket.to(socketId).emit('message', event);
    });
  }
}
