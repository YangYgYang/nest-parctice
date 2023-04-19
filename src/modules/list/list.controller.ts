import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ApiOperation,ApiTags } from '@nestjs/swagger'

@ApiTags('List')
@Controller('/api/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiOperation({ summary: '新增代辦項目' })
  create(@Body() createListDto: CreateListDto| any) {
    return this.listService.create(createListDto);
  }

  @Get()
  @ApiOperation({ summary: '取得單一使用者所有代辦項目' })
  findAll() {
    return 1;
    // return this.listService.findAll();
  }

  // @Get(':id')
  // @ApiOperation({ summary: '取得單一代辦項目' })
  // findOne(@Param('id') id: string) {
  //   return this.listService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: '修改單一代辦項目' })
  // update(@Param('id') id: string, @Body() updateListDto: UpdateListDto) {
  //   return this.listService.update(+id, updateListDto);
  // }

  @Delete(':id')
  @ApiOperation({ summary: '刪除單一代辦項目' })
  remove(@Param('id') id: string) {
    return this.listService.remove(+id);
  }
}
