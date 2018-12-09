import { inject, injectable } from 'inversify';
import { ConfigurationType, IEnvSettings } from '../configuration';
import { connect } from 'socket.io-client';

export const SocketsServiceType = Symbol.for('SOCKET_SERVICE');

export interface ISocketsService {
  send(msg: any): any;

  setToken(token: string): void;

  setMessageCallback(callback: (msg: any) => void): void;
}

@injectable()
export class SocketsService implements ISocketsService {
  socket!: any;
  setToken = (token: string) => {
    this.token = token;
    if (this.token === '') this.socket.disconnect();
    this.connect();
    this.socket.on('message', (msg: any[]) => this.onMessageCallback(msg));
  };
  private token: string = '';
  private onMessageCallback: (msg: any) => void = () => {};

  constructor(@inject(ConfigurationType) private readonly config: IEnvSettings) {}

  setMessageCallback(callback: (msg: any) => void) {
    this.onMessageCallback = callback;
  }

  connect() {
    this.socket = connect(
      this.config.baseUrl,
      {
        query: `token=${this.token}`,
        secure: true,
      },
    );
  }

  send(msg: any) {
    this.socket.emit('message', { data: msg });
  }
}
