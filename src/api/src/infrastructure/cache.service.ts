import Redis, { Redis as IRedis } from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService extends Redis {
  constructor() {
    super();
    const client = new Redis({ host: process.env.REDISNAME || 'localhost' });
    Object.assign(this, client);
    this.flushall();
  }
}