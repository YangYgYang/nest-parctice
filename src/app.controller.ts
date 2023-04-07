import { Controller, Get ,Delete,Post,Put,Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  getUserDataById(@Param('userId')id): string {
    return this.appService.getHello();
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
  updateList():string{
    return this.appService.updateList();
  }
}
