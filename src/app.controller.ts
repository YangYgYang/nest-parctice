import { Controller, Get ,Delete,Post,Put,Param,HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

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

  @Post()
  creatList():string{
    return this.appService.createList();
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  updateList():string{
    console.log(HttpStatus.NO_CONTENT)
    return this.appService.updateList();
  }
}
