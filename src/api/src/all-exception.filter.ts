import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    response.status(exception.getStatus ? exception.getStatus() : 400).json({
      statusCode: exception.getStatus
        ? exception.getStatus()
        : exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
