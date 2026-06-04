import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@localo/shared-types';

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty({ enum: Role })
  role!: Role;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  firstName?: string | null;

  @ApiPropertyOptional()
  lastName?: string | null;

  @ApiPropertyOptional()
  phone?: string | null;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;
}
