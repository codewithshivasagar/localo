import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@localo/shared-types';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { CommissionService } from './commission.service';
import {
  CommissionLedgerFilterDto,
  CommissionSettingFilterDto
} from './dto/commission-ledger-filter.dto';
import {
  CommissionLedgerItemResponseDto,
  CommissionLedgerListResponseDto,
  CommissionSettingEnvelopeResponseDto,
  CommissionSettingListResponseDto,
  CommissionSettingResponseDto,
  CommissionSummaryEnvelopeResponseDto,
  CommissionSummaryResponseDto
} from './dto/commission-response.dto';
import { UpdateCommissionSettingDto } from './dto/update-commission-setting.dto';

@ApiTags('Admin Commission')
@ApiBearerAuth()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/commission')
export class AdminCommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Get('settings')
  @ApiOperation({ summary: 'List commission settings as an admin' })
  @ApiOkResponse({ type: CommissionSettingListResponseDto })
  listSettings(
    @Query() filters: CommissionSettingFilterDto
  ): Promise<PaginationResponse<CommissionSettingResponseDto>> {
    return this.commissionService.listSettings(filters);
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Create or update a shop commission setting' })
  @ApiOkResponse({ type: CommissionSettingEnvelopeResponseDto })
  async updateSetting(
    @Body() dto: UpdateCommissionSettingDto
  ): Promise<ApiResponse<CommissionSettingResponseDto>> {
    const setting = await this.commissionService.updateSetting(dto);

    return {
      success: true,
      message: 'Commission setting updated successfully',
      data: setting
    };
  }

  @Get('ledger')
  @ApiOperation({ summary: 'List commission invoice ledger as an admin' })
  @ApiOkResponse({ type: CommissionLedgerListResponseDto })
  listLedger(
    @Query() filters: CommissionLedgerFilterDto
  ): Promise<PaginationResponse<CommissionLedgerItemResponseDto>> {
    return this.commissionService.listLedger(filters);
  }
}

@ApiTags('Shop Owner Commission')
@ApiBearerAuth()
@Roles(Role.SHOP_OWNER)
@Controller('shop-owner/commission')
export class ShopOwnerCommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get commission summary for the authenticated shop owner' })
  @ApiOkResponse({ type: CommissionSummaryEnvelopeResponseDto })
  async getSummary(
    @CurrentUser() user: AuthenticatedUser
  ): Promise<ApiResponse<CommissionSummaryResponseDto>> {
    const summary = await this.commissionService.getOwnerSummary(user);

    return {
      success: true,
      message: 'Commission summary fetched successfully',
      data: summary
    };
  }

  @Get('ledger')
  @ApiOperation({ summary: 'List own commission invoice ledger' })
  @ApiOkResponse({ type: CommissionLedgerListResponseDto })
  listOwnerLedger(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: CommissionLedgerFilterDto
  ): Promise<PaginationResponse<CommissionLedgerItemResponseDto>> {
    return this.commissionService.listOwnerLedger(user, filters);
  }
}

