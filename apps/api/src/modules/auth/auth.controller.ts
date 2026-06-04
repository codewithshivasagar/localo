import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import { AuthService, type AuthResponseData } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Body() dto: LoginDto): Promise<ApiResponse<AuthResponseData>> {
    const data = await this.authService.login(dto.email, dto.password);

    return {
      success: true,
      message: 'Login successful',
      data
    };
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh auth tokens' })
  @ApiOkResponse({ type: AuthResponseDto })
  async refresh(
    @Body() dto: RefreshTokenDto
  ): Promise<ApiResponse<AuthResponseData>> {
    const data = await this.authService.refresh(dto.refreshToken);

    return {
      success: true,
      message: 'Token refreshed successfully',
      data
    };
  }

  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Logout and revoke refresh token' })
  async logout(@Body() dto: LogoutDto): Promise<ApiResponse<null>> {
    await this.authService.logout(dto.refreshToken);

    return {
      success: true,
      message: 'Logout successful',
      data: null
    };
  }
}
