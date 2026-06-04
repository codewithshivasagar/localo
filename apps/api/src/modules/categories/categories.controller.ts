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
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import { CategoriesService } from './categories.service';
import { CategoryFilterDto } from './dto/category-filter.dto';
import {
  CategoryEnvelopeResponseDto,
  CategoryListResponseDto,
  CategoryResponseDto
} from './dto/category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Categories')
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'List active public categories' })
  @ApiOkResponse({ type: CategoryListResponseDto })
  listPublic(
    @Query() filters: CategoryFilterDto
  ): Promise<PaginationResponse<CategoryResponseDto>> {
    return this.categoriesService.listPublic(filters);
  }

  @Public()
  @Get('categories/:id')
  @ApiOperation({ summary: 'Get active public category detail' })
  @ApiOkResponse({ type: CategoryEnvelopeResponseDto })
  async findPublic(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<CategoryResponseDto>> {
    const category = await this.categoriesService.findPublic(id);

    return {
      success: true,
      message: 'Category fetched successfully',
      data: category
    };
  }

  @Post('admin/categories')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Create a category as an admin' })
  @ApiCreatedResponse({ type: CategoryEnvelopeResponseDto })
  async create(
    @Body() dto: CreateCategoryDto
  ): Promise<ApiResponse<CategoryResponseDto>> {
    const category = await this.categoriesService.create(dto);

    return {
      success: true,
      message: 'Category created successfully',
      data: category
    };
  }

  @Patch('admin/categories/:id')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Update a category as an admin' })
  @ApiOkResponse({ type: CategoryEnvelopeResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto
  ): Promise<ApiResponse<CategoryResponseDto>> {
    const category = await this.categoriesService.update(id, dto);

    return {
      success: true,
      message: 'Category updated successfully',
      data: category
    };
  }

  @Delete('admin/categories/:id')
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Deactivate a category as an admin' })
  @ApiOkResponse({ type: CategoryEnvelopeResponseDto })
  async deactivate(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<CategoryResponseDto>> {
    const category = await this.categoriesService.deactivate(id);

    return {
      success: true,
      message: 'Category deactivated successfully',
      data: category
    };
  }
}
