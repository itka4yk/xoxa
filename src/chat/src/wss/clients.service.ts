import { CacheService } from '../infrastructure/cache.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientsService {
  constructor(private readonly cache: CacheService) {}

  async handleClientConnected(clientId: string, socketId: string) {
    await this.cache.multi().sadd(`client:${clientId}`, socketId).set(`socket:${socketId}`, clientId).exec();
  }

  async handleClientDisconnected(clientId: string, socketId: string) {
    await this.cache.multi().srem(`client:${clientId}`, socketId).del(`socket:${socketId}`, clientId).exec();
  }

  async getSocketId(clientId: string): Promise<string[]> {
    return await this.cache.smembers(`client:${clientId}`);
  }

  async getClientId(socketId: string): Promise<string>  {
    return await this.cache.get(`socket:${socketId}`);
  }
}