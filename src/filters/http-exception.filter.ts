import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    this.logger.error(exception.message)
    // Check if the error is a foreign key constraint violation
    if (exception.message.includes('foreign key constraint')) {
      // Customize the 400 error response
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cannot delete this item because there are dependent relationships.',
        error: 'Bad Request',
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }
}
