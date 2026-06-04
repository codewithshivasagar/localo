import { Injectable } from '@nestjs/common';
import type { ApiResponse } from '../../common/responses/api-response.type';

export interface HealthData {
  status: 'ok';
}

@Injectable()
export class HealthService {
  checkHealth(): ApiResponse<HealthData> {
    return {
      success: true,
      message: 'Localo API is healthy',
      data: {
        status: 'ok'
      }
    };
  }
}
