import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const body = exception.getResponse();

      if (typeof body === 'string') {
        message = body;
      } else {
        const raw = (body as Record<string, unknown>).message;
        if (Array.isArray(raw)) {
          message = String(raw[0]);
        } else if (typeof raw === 'string') {
          message = raw;
        } else {
          message = exception.message;
        }
      }
    }

    response.status(status).json({ success: false, message });
  }
}
