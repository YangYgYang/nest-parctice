import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World2!';
  }

  deleteList():string{
    return '刪除清單'
  }
  createList():string{
    return '新增清單'
  }
  updateList():string{
    return '更新清單'
  }
}
