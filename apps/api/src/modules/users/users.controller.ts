import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { UsersService } from './users.service';
import type { ApiResponse } from '../../common/responses/api-response.type';
import { CurrentUserResponseDto } from './dto/current-user-response.dto';
import type { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({ type: CurrentUserResponseDto })
  async getCurrentUser(
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<UserResponseDto>> {
    const currentUser = await this.usersService.findCurrentUser(user.id);

    return {
      success: true,
      message: 'Current user fetched successfully',
      data: currentUser
    };
  }
}
