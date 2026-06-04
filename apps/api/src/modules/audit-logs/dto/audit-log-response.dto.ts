import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuditLogActorResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  fullName!: string;

  @ApiProperty({ type: String })
  email!: string;
}

export class AuditLogResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  actorUserId?: string | null;

  @ApiPropertyOptional({ type: () => AuditLogActorResponseDto, nullable: true })
  actorUser?: AuditLogActorResponseDto | null;

  @ApiProperty({ type: String })
  action!: string;

  @ApiProperty({ type: String })
  entityType!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  entityId?: string | null;

  @ApiPropertyOptional({ type: Object, additionalProperties: true })
  oldValues?: unknown;

  @ApiPropertyOptional({ type: Object, additionalProperties: true })
  newValues?: unknown;

  @ApiPropertyOptional({ type: String, nullable: true })
  ipAddress?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  userAgent?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;
}

export class AuditLogEnvelopeResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String, example: 'Audit log fetched successfully' })
  message!: string;

  @ApiProperty({ type: () => AuditLogResponseDto })
  data!: AuditLogResponseDto;
}

export class AuditLogListResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String, example: 'Audit logs fetched successfully' })
  message!: string;

  @ApiProperty({ type: () => [AuditLogResponseDto] })
  data!: AuditLogResponseDto[];
}