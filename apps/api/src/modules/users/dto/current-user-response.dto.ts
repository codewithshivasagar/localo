import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class CurrentUserResponseDto {
  @ApiProperty({ type: Boolean, example: true })
  success!: boolean;

  @ApiProperty({ type: String, example: 'Current user fetched successfully' })
  message!: string;

  @ApiProperty({ type: () => UserResponseDto })
  data!: UserResponseDto;
}
