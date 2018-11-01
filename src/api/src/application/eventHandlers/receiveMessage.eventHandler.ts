import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../events/receivedMessage.event';
import { WebSocketServer, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
@EventsHandler(ReceivedMessageEvent)
export class ReceivedMessageEventHandler implements IEventHandler<ReceivedMessageEvent> {
  @WebSocketServer() server;

  handle(event: ReceivedMessageEvent) {
    this.server.emit('hej', 'test event handler response');
  }
}