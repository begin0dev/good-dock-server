import { Server } from 'http';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

import express = require('express');

import { AppModule } from './app.module';
import { GlobalInterceptor } from './interceptors/global.interceptor';
import { GlobalExceptionFilter } from './exceptions/global-exception.filter';

let cachedServer: Server;
const binaryMimeTypes: string[] = [];

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    nestApp.use(eventContext());

    nestApp.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    nestApp.useGlobalFilters(new GlobalExceptionFilter());
    nestApp.useGlobalInterceptors(new GlobalInterceptor());

    await nestApp.init();
    cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
  }
  return cachedServer;
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
