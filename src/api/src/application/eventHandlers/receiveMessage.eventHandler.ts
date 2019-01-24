import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../events/receivedMessage.event';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesRepository } from '../../infrastructure/repositories/messages.repository';
import { IMessageState } from '../../domain/messages/message';
import { ClientsService } from '../../infrastructure/clients.service';
import { SpacesRepository } from '../../infrastructure/repositories/spaces.repository';

@WebSocketGateway()
@EventsHandler(ReceivedMessageEvent)
export class ReceivedMessageEventHandler
  implements IEventHandler<ReceivedMessageEvent> {
  @WebSocketServer() socket;

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly clientsService: ClientsService,
    private readonly spacesRepository: SpacesRepository,
  ) {}

  async handle(event: ReceivedMessageEvent) {
    await this.messagesRepository.create(event as IMessageState);
    const space = await this.spacesRepository.getById(event.spaceId);
    if (event.isPrivate) {
      const receiver = space.state.members.find(
        m => m.id === event.receiverId,
      )!;
      await this.sendToClient(receiver.userId, event);
      const sender = space.state.members.find(m => m.id === event.senderId)!;
      await this.sendToClient(sender.userId, event);
    } else {
      const members = space.state.members;
      members.forEach(c => this.sendToClient(c.userId, event));
    }
  }

  private async sendToClient(clientId: string, event: any) {
    const sockets = await this.clientsService.getSocketId(clientId);
    sockets.forEach((socketId: string) => {
      this.socket.to(socketId).emit('message', event);
    });
  }
}
