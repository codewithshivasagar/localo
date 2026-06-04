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
import { CreateSupportTicketMessageDto } from './dto/create-support-ticket-message.dto';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { SupportTicketFilterDto } from './dto/support-ticket-filter.dto';
import {
  SupportTicketEnvelopeResponseDto,
  SupportTicketListResponseDto,
  SupportTicketResponseDto
} from './dto/support-ticket-response.dto';
import { UpdateSupportTicketStatusDto } from './dto/update-support-ticket-status.dto';
import { SupportTicketsService } from './support-tickets.service';

@ApiTags('Support Tickets')
@ApiBearerAuth()
@Controller('support-tickets')
export class SupportTicketsController {
  constructor(private readonly supportTicketsService: SupportTicketsService) {}

  @Post()
  @Roles(
    Role.CUSTOMER,
    Role.SHOP_OWNER,
    Role.SHOP_STAFF,
    Role.ADMIN,
    Role.SUPER_ADMIN
  )
  @ApiOperation({ summary: 'Create a support ticket' })
  @ApiCreatedResponse({ type: SupportTicketEnvelopeResponseDto })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateSupportTicketDto
  ): Promise<ApiResponse<SupportTicketResponseDto>> {
    const ticket = await this.supportTicketsService.create(user, dto);

    return {
      success: true,
      message: 'Support ticket created successfully',
      data: ticket
    };
  }

  @Get('my')
  @ApiOperation({ summary: 'List my support tickets' })
  @ApiOkResponse({ type: SupportTicketListResponseDto })
  listMine(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: SupportTicketFilterDto
  ): Promise<PaginationResponse<SupportTicketResponseDto>> {
    return this.supportTicketsService.listMine(user, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get my support ticket detail' })
  @ApiOkResponse({ type: SupportTicketEnvelopeResponseDto })
  async findMine(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<SupportTicketResponseDto>> {
    const ticket = await this.supportTicketsService.findMine(user, id);

    return {
      success: true,
      message: 'Support ticket fetched successfully',
      data: ticket
    };
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Add a message to a support ticket' })
  @ApiCreatedResponse({ type: SupportTicketEnvelopeResponseDto })
  async addMessage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateSupportTicketMessageDto
  ): Promise<ApiResponse<SupportTicketResponseDto>> {
    const ticket = await this.supportTicketsService.addMessage(user, id, dto);

    return {
      success: true,
      message: 'Support ticket message added successfully',
      data: ticket
    };
  }
}

@ApiTags('Admin Support Tickets')
@ApiBearerAuth()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin/support-tickets')
export class AdminSupportTicketsController {
  constructor(private readonly supportTicketsService: SupportTicketsService) {}

  @Get()
  @ApiOperation({ summary: 'List all support tickets as an admin' })
  @ApiOkResponse({ type: SupportTicketListResponseDto })
  listAdmin(
    @Query() filters: SupportTicketFilterDto
  ): Promise<PaginationResponse<SupportTicketResponseDto>> {
    return this.supportTicketsService.listAdmin(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get support ticket detail as an admin' })
  @ApiOkResponse({ type: SupportTicketEnvelopeResponseDto })
  async findAdmin(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<SupportTicketResponseDto>> {
    const ticket = await this.supportTicketsService.findAdmin(id);

    return {
      success: true,
      message: 'Support ticket fetched successfully',
      data: ticket
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update support ticket status as an admin' })
  @ApiOkResponse({ type: SupportTicketEnvelopeResponseDto })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSupportTicketStatusDto
  ): Promise<ApiResponse<SupportTicketResponseDto>> {
    const ticket = await this.supportTicketsService.updateStatus(id, dto);

    return {
      success: true,
      message: 'Support ticket status updated successfully',
      data: ticket
    };
  }
}

