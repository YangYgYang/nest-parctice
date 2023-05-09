import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class LoggerProducer {
  constructor(@InjectQueue('logger-queue') private loggerQueue: Queue) {}

  async createLog(log: Log) {
    await this.loggerQueue.add(log);
  }
}
