import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@localo/shared-types';

export class UserResponseDto {
  @ApiProperty({ type: String })
  id!: string;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role!: Role;

  @ApiProperty({ type: String, example: 'ACTIVE' })
  status!: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  firstName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  lastName?: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  phone?: string | null;

  @ApiProperty({ type: String })
  createdAt!: string;

  @ApiProperty({ type: String })
  updatedAt!: string;
}