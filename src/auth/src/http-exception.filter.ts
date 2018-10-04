import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    response
      .status(400)
      .json({
        statusCode: 400,
        error: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}