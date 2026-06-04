import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Role } from '@localo/shared-types';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { AssignShopOwnerDto } from './dto/assign-shop-owner.dto';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopFilterDto } from './dto/shop-filter.dto';
import {
  ShopEnvelopeResponseDto,
  ShopListResponseDto,
  ShopResponseDto
} from './dto/shop-response.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UpdateShopStatusDto } from './dto/update-shop-status.dto';
import { ShopsService } from './shops.service';

@ApiTags('Admin Shops')
@ApiBearerAuth()
@Roles(Role.SUPER_ADMIN, Role.ADMIN)
@Controller('admin/shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Get()
  @ApiOperation({ summary: 'List shops for admins' })
  @ApiOkResponse({ type: ShopListResponseDto })
  list(
    @Query() filters: ShopFilterDto
  ): Promise<PaginationResponse<ShopResponseDto>> {
    return this.shopsService.list(filters);
  }

  @Post()
  @ApiOperation({ summary: 'Create a shop as an admin' })
  @ApiCreatedResponse({ type: ShopEnvelopeResponseDto })
  async create(
    @Body() dto: CreateShopDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<ShopResponseDto>> {
    const shop = await this.shopsService.create(dto, user);

    return {
      success: true,
      message: 'Shop created successfully',
      data: shop
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin shop detail' })
  @ApiOkResponse({ type: ShopEnvelopeResponseDto })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ShopResponseDto>> {
    const shop = await this.shopsService.findOne(id);

    return {
      success: true,
      message: 'Shop fetched successfully',
      data: shop
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shop as an admin' })
  @ApiOkResponse({ type: ShopEnvelopeResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateShopDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<ShopResponseDto>> {
    const shop = await this.shopsService.update(id, dto, user);

    return {
      success: true,
      message: 'Shop updated successfully',
      data: shop
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update shop status as an admin' })
  @ApiOkResponse({ type: ShopEnvelopeResponseDto })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateShopStatusDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<ShopResponseDto>> {
    const shop = await this.shopsService.updateStatus(id, dto, user);

    return {
      success: true,
      message: 'Shop status updated successfully',
      data: shop
    };
  }

  @Patch(':id/assign-owner')
  @ApiOperation({ summary: 'Assign a shop owner as an admin' })
  @ApiOkResponse({ type: ShopEnvelopeResponseDto })
  async assignOwner(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignShopOwnerDto,
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<ShopResponseDto>> {
    const shop = await this.shopsService.assignOwner(id, dto, user);

    return {
      success: true,
      message: 'Shop owner assigned successfully',
      data: shop
    };
  }
}
