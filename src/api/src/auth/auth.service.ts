import { Injectable, NotImplementedException, BadRequestException } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  @Client({ transport: Transport.REDIS })
  client: ClientProxy;

  async verify(token: string): Promise<any> {
    return await this.client.send<string>({ cmd: 'verify' }, token).toPromise();
  }

  async authenticate(credentials): Promise<string> {
    try {
      return await this.client.send<string>({ cmd: 'authenticate' }, credentials).toPromise();
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }

  async register(newUser): Promise<string> {
    return await this.client.send<string>({ cmd: 'register' }, newUser).toPromise();
  }

  async activate(id: any) {
    return await this.client.send<string>({ cmd: 'activate' }, id).toPromise();
  }

  async getUserInfo(token: string): Promise<any> {
    return await this.client.send<string>({ cmd: 'userInfo' }, token).toPromise();
  }
}