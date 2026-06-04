import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessHourDto } from './business-hour.dto';

export class UpdateBusinessHoursDto {
  @ApiProperty({ type: () => [BusinessHourDto] })
  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ValidateNested({ each: true })
  @Type(() => BusinessHourDto)
  businessHours!: BusinessHourDto[];
}
