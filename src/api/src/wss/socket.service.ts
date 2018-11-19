import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventBus } from '@nestjs/cqrs';
import { ReceivedMessageEvent } from '../application/events/receivedMessage.event';
import { UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { ClientsService } from '../infrastructure/clients.service';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { chatMessageSchema } from 'api.contract';
import { WssValidationPipe } from '../shared/pipes/wssValidation.pipe';

@WebSocketGateway()
export class SocketService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  constructor(
    private readonly eventBus: EventBus,
    private readonly clients: ClientsService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(client: Socket) {
    const query = client.handshake.query;
    try {
      const userInfo = await this.authService.getUserInfo(query.token);
      await this.clients.handleClientConnected(userInfo.id, client.id);
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    await this.clients.handleClientDisconnected(client.id);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('message')
  @UsePipes(new WssValidationPipe(chatMessageSchema))
  newMessage(client, data) {
    this.eventBus.publish(new ReceivedMessageEvent(data));
  }
}
