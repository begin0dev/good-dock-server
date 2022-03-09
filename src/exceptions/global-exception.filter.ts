import { Response } from 'express';
import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { JsendStatus } from '../types/jsend.types';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    let { message } = exception;
    const errRes = exception.getResponse?.();
    if (status === 400 && typeof errRes === 'object') {
      message = `${message} - ${errRes['message'][0]}`;
    }
    res.status(status).json({ status: JsendStatus.ERROR, message: message });
  }
}
