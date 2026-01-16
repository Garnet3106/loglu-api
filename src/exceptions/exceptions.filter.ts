import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpError } from './exception';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpError, host: ArgumentsHost) {
    console.error(exception)
    const context = host.switchToHttp();
    const response = context.getResponse();
    let content = {
      statusCode: 500,
      message: 'internal server error',
    };
    if (exception instanceof HttpError) {
      content = {
        statusCode: exception.statusCode,
        message: exception.message,
      };
    }
    if (exception instanceof BadRequestException) {
      content = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'invalid request format',
      };
    }
    response
      .status(content.statusCode)
      .json({ statusCode: content.statusCode, message: content.message });
  }
}
