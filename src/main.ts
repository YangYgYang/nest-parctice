import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filters';
import 'reflect-metadata';

//for hot reload
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('');

  //////api document config swagger
  const config = new DocumentBuilder()
    .setTitle('NestTest')
    .setDescription('The NestTest API description')
    .setVersion('1.0')
    // .addTag('test')
    .build();

  //////api document swagger config
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
