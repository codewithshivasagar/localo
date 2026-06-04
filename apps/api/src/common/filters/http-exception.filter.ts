import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { ErrorResponse } from '../responses/error-response.type';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse: string | Record<string, unknown> =
      exception instanceof HttpException
        ? this.normalizeExceptionResponse(exception.getResponse())
        : {
            error: exception instanceof Error ? exception.name : 'Error',
            message:
              exception instanceof Error ? exception.message : 'Internal server error'
          };

    const message = this.extractMessage(
      exceptionResponse,
      exception instanceof Error ? exception.message : 'Internal server error'
    );
    const error = this.extractError(
      exceptionResponse,
      exception instanceof Error ? exception.name : 'Error'
    );

    const payload: ErrorResponse = {
      success: false,
      message,
      error,
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      path: request.url,
      timestamp: new Date().toISOString()
    };

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const details = (exceptionResponse as Record<string, unknown>).message;
      if (details !== undefined && details !== message) {
        payload.details = details;
      }
    }

    response.status(status).json(payload);
  }

  private extractMessage(
    exceptionResponse: string | Record<string, unknown>,
    fallback: string
  ) {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    const responseMessage = exceptionResponse.message;

    if (typeof responseMessage === 'string') {
      return responseMessage;
    }

    if (Array.isArray(responseMessage)) {
      return responseMessage.join(', ');
    }

    return fallback;
  }

  private extractError(
    exceptionResponse: string | Record<string, unknown>,
    fallback: string
  ) {
    if (typeof exceptionResponse === 'string') {
      return fallback;
    }

    const responseError = exceptionResponse.error;

    if (typeof responseError === 'string') {
      return responseError;
    }

    return fallback;
  }

  private normalizeExceptionResponse(response: string | object) {
    if (typeof response === 'string') {
      return response;
    }

    return response as Record<string, unknown>;
  }
}
