import { Controller, Get ,Delete,Post,Put,Param,HttpCode, HttpStatus,Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  getUserDataById(@Param('userId')id:string): string {
    // return this.appService.getHello();
    return id;
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Delete()
  list():string{
    return this.appService.deleteList();
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
    return this.appService.updateList();
  }
}
