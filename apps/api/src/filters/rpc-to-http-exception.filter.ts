import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const error = exception.getError() as { code: number; message: string };
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = error?.code || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error?.message || 'Something went wrong.';

    response.status(status).json({
      message,
      statusCode: status,
    });
  }
}
