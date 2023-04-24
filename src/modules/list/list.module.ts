import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lists } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lists])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
