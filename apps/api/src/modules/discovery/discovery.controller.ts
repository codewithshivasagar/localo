import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import { ProductFilterDto } from '../products/dto/product-filter.dto';
import {
  ProductListResponseDto,
  ProductResponseDto
} from '../products/dto/product-response.dto';
import { DiscoveryService } from './discovery.service';
import {
  PublicShopEnvelopeResponseDto,
  PublicShopListResponseDto,
  PublicShopResponseDto
} from './dto/public-shop-response.dto';
import { ShopDiscoveryFilterDto } from './dto/shop-discovery-filter.dto';

@ApiTags('Discovery')
@Public()
@Controller('shops')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get()
  @ApiOperation({ summary: 'List active public shops' })
  @ApiOkResponse({ type: PublicShopListResponseDto })
  listShops(
    @Query() filters: ShopDiscoveryFilterDto
  ): Promise<PaginationResponse<PublicShopResponseDto>> {
    return this.discoveryService.listShops(filters);
  }

  @Get(':id/products')
  @ApiOperation({ summary: 'List active public products for a public shop' })
  @ApiOkResponse({ type: ProductListResponseDto })
  listShopProducts(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    return this.discoveryService.listShopProducts(id, filters);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Get active public shop detail by slug' })
  @ApiOkResponse({ type: PublicShopEnvelopeResponseDto })
  async findShopBySlug(
    @Param('slug') slug: string
  ): Promise<ApiResponse<PublicShopResponseDto>> {
    const shop = await this.discoveryService.findShopBySlug(slug);

    return {
      success: true,
      message: 'Shop fetched successfully',
      data: shop
    };
  }
}

