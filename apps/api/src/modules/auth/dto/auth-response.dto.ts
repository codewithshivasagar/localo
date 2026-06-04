import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from '../../users/dto/user-response.dto';

export class AuthTokensDto {
  @ApiProperty({ type: String })
  accessToken!: string;

  @ApiProperty({ type: String })
  refreshToken!: string;
}

export class AuthResponseDataDto {
  @ApiProperty({ type: () => UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ type: () => AuthTokensDto })
  tokens!: AuthTokensDto;
}

export class AuthResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String, example: 'Login successful' })
  message!: string;

  @ApiProperty({ type: () => AuthResponseDataDto })
  data!: AuthResponseDataDto;
}