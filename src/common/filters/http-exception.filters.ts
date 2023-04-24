import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    //從context轉換為http上下文
    const ctx = host.switchToHttp();
    //在http上下文中得到response
    const response = ctx.getResponse<Response>();
    //獲取exception機制中的http狀態碼
    const status = exception.getStatus();
    //獲取exception機制中的訊息
    const message = exception.message;
    //獲取當前時間，以方便瞭解錯誤資訊
    const timestamp = new Date().toISOString();

    const responseObject = {
      code: status,
      message,
      timestamp,
    };
    response.status(status).json(responseObject);
  }
}
