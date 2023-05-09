import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class LoggerService {
  private static redis: Redis = new Redis({
    host: 'localhost',
    port: 6379,
  });

  //   constructor() {}

  async create(log) {
    await LoggerService.redis.set('key', log);
  }
}
