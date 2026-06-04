import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((value) => {
        if (this.isApiEnvelope(value)) {
          return value;
        }

        return {
          success: true,
          message: 'OK',
          data: value ?? null
        };
      })
    );
  }

  private isApiEnvelope(value: unknown): value is { success: boolean } {
    return typeof value === 'object' && value !== null && 'success' in value;
  }
}
