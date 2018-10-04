import { Injectable, NotImplementedException } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  async verify(token: string): Promise<any> {
    return await this.client.send<string>({ cmd: 'verify' }, token).toPromise();
  }
}