import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuditLogActorResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  fullName!: string;

  @ApiProperty()
  email!: string;
}

export class AuditLogResponseDto {
  @ApiProperty()
  id!: string;

  @ApiPropertyOptional()
  actorUserId?: string | null;

  @ApiPropertyOptional({ type: AuditLogActorResponseDto })
  actorUser?: AuditLogActorResponseDto | null;

  @ApiProperty()
  action!: string;

  @ApiProperty()
  entityType!: string;

  @ApiPropertyOptional()
  entityId?: string | null;

  @ApiPropertyOptional()
  oldValues?: unknown;

  @ApiPropertyOptional()
  newValues?: unknown;

  @ApiPropertyOptional()
  ipAddress?: string | null;

  @ApiPropertyOptional()
  userAgent?: string | null;

  @ApiProperty()
  createdAt!: string;
}

export class AuditLogEnvelopeResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: AuditLogResponseDto })
  data!: AuditLogResponseDto;
}

export class AuditLogListResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty()
  message!: string;

  @ApiProperty({ type: [AuditLogResponseDto] })
  data!: AuditLogResponseDto[];
}

