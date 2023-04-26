import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filters';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Lists } from 'src/modules/List/entities/list.entity';
import * as dotenv from 'dotenv';

//for hot reload,but failed now
declare const module: any;

async function bootstrap() {
  console.log('bootstrap');
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('NestTest')
    .setDescription('The NestTest API description')
    .setVersion('1.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
