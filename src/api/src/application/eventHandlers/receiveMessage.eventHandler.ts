import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../events/receivedMessage.event';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesRepository } from '../../infrastructure/repositories/messages.repository';
import { IMessageState } from '../../domain/messages/message';

@WebSocketGateway()
@EventsHandler(ReceivedMessageEvent)
export class ReceivedMessageEventHandler
  implements IEventHandler<ReceivedMessageEvent> {
  @WebSocketServer() socket;

  constructor(private readonly messagesRepository: MessagesRepository) {}

  async handle(event: ReceivedMessageEvent) {
    await this.messagesRepository.create(event as IMessageState);
  }
}
