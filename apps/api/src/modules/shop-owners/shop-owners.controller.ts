import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@localo/shared-types';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import {
  ShopOwnerShopEnvelopeResponseDto,
  ShopOwnerShopResponseDto
} from './dto/shop-owner-shop-response.dto';
import { UpdateBusinessHoursDto } from './dto/update-business-hours.dto';
import { UpdateOwnShopDto } from './dto/update-own-shop.dto';
import { UpdateShopLocationDto } from './dto/update-shop-location.dto';
import { ShopOwnersService } from './shop-owners.service';

@ApiTags('Shop Owner Shop')
@ApiBearerAuth()
@Roles(Role.SHOP_OWNER)
@Controller('shop-owner/shops')
export class ShopOwnersController {
  constructor(private readonly shopOwnersService: ShopOwnersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the authenticated shop owner shop' })
  @ApiOkResponse({ type: ShopOwnerShopEnvelopeResponseDto })
  async getOwnShop(
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<ShopOwnerShopResponseDto>> {
    const shop = await this.shopOwnersService.getOwnShop(user);

    return {
      success: true,
      message: 'Shop fetched successfully',
      data: shop
    };
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update the authenticated shop owner profile' })
  @ApiOkResponse({ type: ShopOwnerShopEnvelopeResponseDto })
  async updateOwnShop(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateOwnShopDto
  ): Promise<ApiResponse<ShopOwnerShopResponseDto>> {
    const shop = await this.shopOwnersService.updateOwnShop(user, dto);

    return {
      success: true,
      message: 'Shop updated successfully',
      data: shop
    };
  }

  @Put('me/location')
  @ApiOperation({ summary: 'Update the authenticated shop owner primary location' })
  @ApiOkResponse({ type: ShopOwnerShopEnvelopeResponseDto })
  async updateLocation(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateShopLocationDto
  ): Promise<ApiResponse<ShopOwnerShopResponseDto>> {
    const shop = await this.shopOwnersService.updateLocation(user, dto);

    return {
      success: true,
      message: 'Shop location updated successfully',
      data: shop
    };
  }

  @Put('me/business-hours')
  @ApiOperation({ summary: 'Update the authenticated shop owner business hours' })
  @ApiOkResponse({ type: ShopOwnerShopEnvelopeResponseDto })
  async updateBusinessHours(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateBusinessHoursDto
  ): Promise<ApiResponse<ShopOwnerShopResponseDto>> {
    const shop = await this.shopOwnersService.updateBusinessHours(user, dto);

    return {
      success: true,
      message: 'Shop business hours updated successfully',
      data: shop
    };
  }
}
