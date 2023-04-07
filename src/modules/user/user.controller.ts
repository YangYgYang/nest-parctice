import { Controller, Get ,Delete,Post,Put,Param,HttpCode, HttpStatus,Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  getUserDataById(@Param('userId')id:string): string {
    // return this.appService.getHello();
    return id;
  }
  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Delete()
  list():string{
    return this.userService.deleteList();
  }

  @Post(':id')
  creatList(
    @Body() dto:CreateUserDto,
    @Param('id')id:string
    ){
    // console.log(HttpStatus)
    return {id,dto};
  }

  @Put()
  // @HttpCode(HttpStatus.NO_CONTENT)
  updateList():string{
    return this.userService.updateList();
  }
}
