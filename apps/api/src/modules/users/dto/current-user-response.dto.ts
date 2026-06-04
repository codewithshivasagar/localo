import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class CurrentUserResponseDto {
  @ApiProperty({ example: true })
  success!: true;

  @ApiProperty({ example: 'Current user fetched successfully' })
  message!: string;

  @ApiProperty({ type: UserResponseDto })
  data!: UserResponseDto;
}
