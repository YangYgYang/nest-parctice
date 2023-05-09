import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggerProducer } from '../logger/queues/logger.producer';

@ApiTags('List')
@Controller('/list')
export class ListController {
  constructor(
    private readonly listService: ListService,
    private loggerProducer: LoggerProducer,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: '新增代辦項目' })
  create(@Body() createListDto: CreateListDto | any, @Req() req: any) {
    createListDto.user = req.user.userId;
    const log: Log = {
      level: 'info',
      method: 'Post',
      url: '/list',
      request_message: JSON.stringify(createListDto),
      response_code: 200,
      response_message: JSON.stringify({ id: createListDto.user.id }),
    };
    console.log(log);
    this.loggerProducer.createLog(log);
    return this.listService.create(createListDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: '取得單一使用者所有代辦項目' })
  findAll(@Req() req: any) {
    return this.listService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '取得單一代辦項目' })
  findOne(@Param('id') id: string) {
    return this.listService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: '修改單一代辦項目' })
  update(
    @Param('id') id: string,
    @Body() updateListDto: any,
    // @Body() updateListDto: UpdateListDto,
    @Req() req: any,
  ) {
    updateListDto.userId = req.user.userId;
    updateListDto.id = Number(id);
    return this.listService.update(updateListDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '刪除單一代辦項目' })
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
