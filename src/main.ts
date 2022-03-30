import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { GlobalInterceptor } from './interceptors/global.interceptor';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';

async function bootstrap() {
  const { PORT = 3001 } = process.env;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/dev');
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalInterceptor());

  // RUN server
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}

bootstrap();
