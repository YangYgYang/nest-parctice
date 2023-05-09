import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { LoggerService } from '../logger.service';
import { Job, Queue } from 'bull';

@Processor('logger-queue')
export class LoggerConsumer {
  constructor(
    @InjectQueue('logger-queue')
    private loggerQueue: Queue,
    private loggerService: LoggerService,
  ) {}
  @Process()
  async finishLog(job: Job<Log>) {
    const log: Log = job.data;
    // loggerService.create 將 log 寫入資料庫
    await this.loggerService.create(log);
    // 寫入完要印出
    console.log('success' + job.id);
  }
}
