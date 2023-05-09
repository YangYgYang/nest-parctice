import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lists } from './entities/list.entity';
import { BullModule } from '@nestjs/bull';
import { LoggerProducer } from '../logger/queues/logger.producer';
import { LoggerConsumer } from '../logger/queues/logger.consumer';
import { LoggerService } from '../logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lists]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'logger-queue',
    }),
  ],
  controllers: [ListController],
  providers: [ListService, LoggerProducer, LoggerConsumer, LoggerService],
})
export class ListModule {}
