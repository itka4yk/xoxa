import { inject, injectable } from 'inversify';
import { ConfigurationType, IEnvSettings } from '../configuration';
import { connect, Manager } from 'socket.io-client';
// @ts-ignore
import * as wildcard from 'socketio-wildcard';

export const SocketsServiceType = Symbol.for('SOCKET_SERVICE');

export interface ISocketsService {
  send(msg: any): any;

  setToken(token: string): void;

  setMessageCallback(callback: (msg: any) => void): void;
}

interface ISocketMessage {
  type: Number;
  nsp: string;
  data: any[];
}

@injectable()
export class SocketsService implements ISocketsService {
  socket!: SocketIOClient.Socket;
  setToken = (token: string) => {
    this.token = token;
    if (this.token === '') this.socket.disconnect();
    this.connect();
  };
  private token: string = '';
  private onMessageCallback: (msg: any) => void = () => {
  };

  constructor(@inject(ConfigurationType) private readonly config: IEnvSettings) {
  }

  setMessageCallback(callback: (msg: any) => void) {
    this.onMessageCallback = callback;
    this.socket.on('*', console.log);
    this.socket.on('*', ({ data }: ISocketMessage) => this.onMessageCallback(data[0]));
  }

  connect() {
    this.socket = connect(this.config.baseUrl.replace('http//', ''), {
      query: `token=${this.token}`,
    });
    const patch = wildcard(Manager);
    patch(this.socket);
  }

  send(msg: any) {
    this.socket.emit('message', { data: msg });
  }
}
