import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class ClientsService {
  cache: Redis.Redis;

  constructor() {
    this.cache = new Redis({ host: process.env.REDISNAME || 'localhost' });
  }

  async handleClientConnected(clientId: string, socketId: string) {
    return await this.cache
      .multi()
      .sadd(`client:${clientId}`, socketId)
      .set(`socket:${socketId}`, clientId)
      .exec();
  }

  async handleClientDisconnected(socketId: string) {
    const clientId = await this.cache.get(`socket:${socketId}`);
    return await this.cache
      .multi()
      .srem(`client:${clientId}`, socketId)
      .del(`socket:${socketId}`)
      .exec();
  }

  async getSocketId(clientId: string): Promise<string[]> {
    return await this.cache.smembers(`client:${clientId}`);
  }

  async getClientId(socketId: string): Promise<string> {
    return await this.cache.get(`socket:${socketId}`);
  }
}
