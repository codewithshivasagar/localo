import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { HealthService } from './health.service';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { HealthData } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Check API health' })
  @ApiOkResponse({
    schema: {
      example: {
        success: true,
        message: 'Localo API is healthy',
        data: {
          status: 'ok'
        }
      }
    }
  })
  getHealth(): ApiResponse<HealthData> {
    return this.healthService.checkHealth();
  }
}
