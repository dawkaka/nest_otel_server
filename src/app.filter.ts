import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ReportError } from 'apitoolkit-fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Report error to APIToolkit
    ReportError(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    response.status(status).send({
      statusCode: status,
      message,
    });
  }
}
