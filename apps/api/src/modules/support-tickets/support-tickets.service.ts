import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { SupportTicketStatus } from '@prisma/client';
import { Role } from '@localo/shared-types';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { AuditLogsService } from '../audit-logs/audit-logs.service';
import { CreateSupportTicketMessageDto } from './dto/create-support-ticket-message.dto';
import { CreateSupportTicketDto } from './dto/create-support-ticket.dto';
import { SupportTicketFilterDto } from './dto/support-ticket-filter.dto';
import { SupportTicketResponseDto } from './dto/support-ticket-response.dto';
import { UpdateSupportTicketStatusDto } from './dto/update-support-ticket-status.dto';
import {
  SupportTicketsRepository,
  type SupportTicketWithRelations
} from './support-tickets.repository';

@Injectable()
export class SupportTicketsService {
  constructor(
    @Inject(SupportTicketsRepository) private readonly supportTicketsRepository: SupportTicketsRepository,
    @Inject(AuditLogsService) private readonly auditLogsService: AuditLogsService
  ) {}

  async create(
    user: AuthenticatedUser,
    dto: CreateSupportTicketDto
  ): Promise<SupportTicketResponseDto> {
    await this.ensureCanReferenceShop(user, dto.shopId);

    const ticket = await this.supportTicketsRepository.create({
      ticketNumber: generateTicketNumber(),
      createdById: user.id,
      shopId: dto.shopId,
      category: dto.category.trim(),
      priority: dto.priority,
      subject: dto.subject.trim(),
      description: dto.description.trim()
    });

    return this.toTicketResponse(ticket, isAdmin(user));
  }

  async listMine(
    user: AuthenticatedUser,
    filters: SupportTicketFilterDto
  ): Promise<PaginationResponse<SupportTicketResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, tickets] = await this.supportTicketsRepository.listMine(
      user.id,
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Support tickets fetched successfully',
      data: tickets.map((ticket) => this.toTicketResponse(ticket, isAdmin(user))),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findMine(
    user: AuthenticatedUser,
    ticketId: string
  ): Promise<SupportTicketResponseDto> {
    const ticket = await this.getTicketOrThrow(ticketId);
    this.ensureCanViewTicket(user, ticket);

    return this.toTicketResponse(ticket, isAdmin(user));
  }

  async addMessage(
    user: AuthenticatedUser,
    ticketId: string,
    dto: CreateSupportTicketMessageDto
  ): Promise<SupportTicketResponseDto> {
    const ticket = await this.getTicketOrThrow(ticketId);
    this.ensureCanViewTicket(user, ticket);

    if (ticket.status === SupportTicketStatus.CLOSED) {
      throw new BadRequestException('Cannot add messages to a closed ticket');
    }

    const updatedTicket = await this.supportTicketsRepository.addMessage({
      ticketId,
      senderId: user.id,
      body: dto.body.trim(),
      isInternalNote: isAdmin(user) ? (dto.isInternalNote ?? false) : false,
      attachmentMediaIds: dto.attachmentMediaIds ?? []
    });

    return this.toTicketResponse(updatedTicket, isAdmin(user));
  }

  async listAdmin(
    filters: SupportTicketFilterDto
  ): Promise<PaginationResponse<SupportTicketResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, tickets] = await this.supportTicketsRepository.listAdmin(
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Support tickets fetched successfully',
      data: tickets.map((ticket) => this.toTicketResponse(ticket, true)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async findAdmin(ticketId: string): Promise<SupportTicketResponseDto> {
    const ticket = await this.getTicketOrThrow(ticketId);
    return this.toTicketResponse(ticket, true);
  }

  async updateStatus(
    ticketId: string,
    dto: UpdateSupportTicketStatusDto,
    actor?: AuthenticatedUser
  ): Promise<SupportTicketResponseDto> {
    const existingTicket = await this.getTicketOrThrow(ticketId);

    if (dto.assignedToId) {
      const assignedUser = await this.supportTicketsRepository.findAssignedUser(
        dto.assignedToId
      );

      if (!assignedUser) {
        throw new NotFoundException('Assigned user not found');
      }
    }

    const ticket = await this.supportTicketsRepository.updateStatus({
      ticketId,
      status: dto.status,
      assignedToId: dto.assignedToId
    });

    const response = this.toTicketResponse(ticket, true);
    await this.auditLogsService.recordSafe({
      actorUserId: actor?.id,
      action: 'support_tickets.status_updated',
      entityType: 'support_tickets',
      entityId: ticketId,
      oldValues: this.toTicketResponse(existingTicket, true),
      newValues: response
    });

    return response;
  }

  private async ensureCanReferenceShop(user: AuthenticatedUser, shopId?: string) {
    if (!shopId) {
      return;
    }

    const shop = await this.supportTicketsRepository.findShop(shopId);

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    if (isAdmin(user)) {
      return;
    }

    if (user.role === Role.SHOP_OWNER || user.role === Role.SHOP_STAFF) {
      const ownedShop = await this.supportTicketsRepository.findOwnedShop(
        user.id,
        shopId
      );

      if (!ownedShop) {
        throw new ForbiddenException('You can only reference your own shop');
      }
    }
  }

  private ensureCanViewTicket(user: AuthenticatedUser, ticket: SupportTicketWithRelations) {
    if (isAdmin(user)) {
      return;
    }

    if (ticket.createdById === user.id || ticket.shop?.ownerUserId === user.id) {
      return;
    }

    throw new ForbiddenException('You cannot access this support ticket');
  }

  private async getTicketOrThrow(ticketId: string) {
    const ticket = await this.supportTicketsRepository.findById(ticketId);

    if (!ticket) {
      throw new NotFoundException('Support ticket not found');
    }

    return ticket;
  }

  private toTicketResponse(
    ticket: SupportTicketWithRelations,
    includeInternalNotes: boolean
  ): SupportTicketResponseDto {
    return {
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      category: ticket.category,
      priority: ticket.priority,
      status: ticket.status,
      subject: ticket.subject,
      description: ticket.description,
      createdBy: toUserSummary(ticket.createdBy),
      assignedTo: ticket.assignedTo ? toUserSummary(ticket.assignedTo) : null,
      shop: ticket.shop
        ? {
            id: ticket.shop.id,
            name: ticket.shop.name,
            slug: ticket.shop.slug
          }
        : null,
      messages: ticket.messages
        .filter((message) => includeInternalNotes || !message.isInternalNote)
        .map((message) => ({
          id: message.id,
          body: message.body,
          isInternalNote: message.isInternalNote,
          sender: toUserSummary(message.sender),
          attachments: message.attachments.map((attachment) => ({
            id: attachment.id,
            mediaId: attachment.mediaId,
            publicUrl: attachment.media.publicUrl,
            altText: attachment.media.altText
          })),
          createdAt: message.createdAt.toISOString()
        })),
      resolvedAt: ticket.resolvedAt?.toISOString() ?? null,
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString()
    };
  }
}

const isAdmin = (user: AuthenticatedUser) =>
  user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN;

const toUserSummary = (user: { id: string; fullName: string; email: string }) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email
});

const generateTicketNumber = () =>
  `SUP-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
