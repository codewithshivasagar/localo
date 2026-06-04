import {
  Body,
  Controller,
  Delete,
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
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import {
  ProductEnvelopeResponseDto,
  ProductListResponseDto,
  ProductResponseDto
} from './dto/product-response.dto';
import { UpdateProductStatusDto } from './dto/update-product-status.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class PublicProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List active public products' })
  @ApiOkResponse({ type: ProductListResponseDto })
  listPublic(
    @Query() filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    return this.productsService.listPublic(filters);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get active public product detail' })
  @ApiOkResponse({ type: ProductEnvelopeResponseDto })
  async findPublic(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.findPublic(id);

    return {
      success: true,
      message: 'Product fetched successfully',
      data: product
    };
  }
}

@ApiTags('Shop Owner Products')
@ApiBearerAuth()
@Roles(Role.SHOP_OWNER)
@Controller('shop-owner/products')
export class ShopOwnerProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List products for the authenticated shop owner' })
  @ApiOkResponse({ type: ProductListResponseDto })
  listForOwner(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: ProductFilterDto
  ): Promise<PaginationResponse<ProductResponseDto>> {
    return this.productsService.listForOwner(user, filters);
  }

  @Post()
  @ApiOperation({ summary: 'Create a product for the authenticated shop owner' })
  @ApiCreatedResponse({ type: ProductEnvelopeResponseDto })
  async createForOwner(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateProductDto
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.createForOwner(user, dto);

    return {
      success: true,
      message: 'Product created successfully',
      data: product
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get owned product detail' })
  @ApiOkResponse({ type: ProductEnvelopeResponseDto })
  async findOwned(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.findOwned(user, id);

    return {
      success: true,
      message: 'Product fetched successfully',
      data: product
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an owned product' })
  @ApiOkResponse({ type: ProductEnvelopeResponseDto })
  async updateForOwner(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.updateForOwner(user, id, dto);

    return {
      success: true,
      message: 'Product updated successfully',
      data: product
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an owned product' })
  @ApiOkResponse({ type: ProductEnvelopeResponseDto })
  async deleteForOwner(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.deleteForOwner(user, id);

    return {
      success: true,
      message: 'Product deleted successfully',
      data: product
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update owned product status' })
  @ApiOkResponse({ type: ProductEnvelopeResponseDto })
  async updateStatusForOwner(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductStatusDto
  ): Promise<ApiResponse<ProductResponseDto>> {
    const product = await this.productsService.updateStatusForOwner(user, id, dto);

    return {
      success: true,
      message: 'Product status updated successfully',
      data: product
    };
  }
}
