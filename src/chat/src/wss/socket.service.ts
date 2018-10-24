import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { EventBus } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../application/events/receivedMessage.event';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ClientsService } from './clients.service';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  constructor(
    private readonly eventBus: EventBus,
    private readonly clients: ClientsService,
    private readonly authService: AuthService,
   ) { }

  async handleConnection(client: Socket, ...args: any[]) {
    const query = client.handshake.query;
    try {
      const token = await this.authService.signin(query.username, query.password);
      this.clients.handleClientConnected('clientId', client.id);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect({ id }: any) {
    this.clients.handleClientDisconnected('clientId', id);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  newMessage(client, data) {
    this.server.to(client.id).emit('hej', 'I just met you');
    this.eventBus.publish(new ReceivedMessageEvent('1', data));
    return { event: 'hej', data: 'hhhej' };
  }
}