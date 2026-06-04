import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthTokensDto {
  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;
}

export class AuthResponseDataDto {
  @ApiProperty({ type: UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ type: AuthTokensDto })
  tokens!: AuthTokensDto;
}

export class AuthResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: 'Login successful' })
  message!: string;

  @ApiProperty({ type: AuthResponseDataDto })
  data!: AuthResponseDataDto;
}
