import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class AssignShopOwnerDto {
  @ApiProperty()
  @IsUUID()
  ownerUserId!: string;
}
