import { Controller, Get, Post, Body, Patch, Param, Delete,BadRequestException, HttpStatus,Catch,UseFilters ,UseGuards,Request,Header,Req} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags,ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport'
import { HttpExceptionFilter } from '../../common/filters/http-exception.filters';

@ApiTags('User')
@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  

  @Get()
  @ApiOperation({ summary: '取得所有使用者' })
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '使用者註冊' })
  @ApiResponse({ 
    status: 200, 
    description: '回傳新增的使用者.' ,
    type:CreateUserDto
  })
  create(
    @Body() createUserDto: CreateUserDto
    ) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: '取得單一使用者' })
  findOne(
    @Param('id') id: string,
    @Req() req: any
    ) {
      if(req.user.userId !== Number(id)){
        throw new BadRequestException('您沒有權限造訪該網頁')
      }
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改單一使用者資料' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '刪除單一使用者資料' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
