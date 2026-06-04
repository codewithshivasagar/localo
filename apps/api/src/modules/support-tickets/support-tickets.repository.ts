import { Injectable } from '@nestjs/common';
import { Prisma, SupportTicketStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { SupportTicketFilterDto } from './dto/support-ticket-filter.dto';

const supportTicketInclude = {
  createdBy: {
    select: {
      id: true,
      fullName: true,
      email: true
    }
  },
  assignedTo: {
    select: {
      id: true,
      fullName: true,
      email: true
    }
  },
  shop: {
    select: {
      id: true,
      name: true,
      slug: true,
      ownerUserId: true
    }
  },
  messages: {
    include: {
      sender: {
        select: {
          id: true,
          fullName: true,
          email: true
        }
      },
      attachments: {
        include: {
          media: {
            select: {
              id: true,
              publicUrl: true,
              altText: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'asc' }
  }
} satisfies Prisma.SupportTicketInclude;

@Injectable()
export class SupportTicketsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.SupportTicketUncheckedCreateInput) {
    return this.prisma.supportTicket.create({
      data,
      include: supportTicketInclude
    });
  }

  listMine(userId: string, filters: SupportTicketFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters, {
      OR: [
        { createdById: userId },
        {
          shop: {
            ownerUserId: userId
          }
        }
      ]
    });

    return this.prisma.$transaction([
      this.prisma.supportTicket.count({ where }),
      this.prisma.supportTicket.findMany({
        where,
        skip,
        take,
        include: supportTicketInclude,
        orderBy: this.buildOrderBy(filters)
      })
    ]);
  }

  listAdmin(filters: SupportTicketFilterDto, skip: number, take: number) {
    const where = this.buildWhere(filters);

    return this.prisma.$transaction([
      this.prisma.supportTicket.count({ where }),
      this.prisma.supportTicket.findMany({
        where,
        skip,
        take,
        include: supportTicketInclude,
        orderBy: this.buildOrderBy(filters)
      })
    ]);
  }

  findById(id: string) {
    return this.prisma.supportTicket.findUnique({
      where: { id },
      include: supportTicketInclude
    });
  }

  findShop(shopId: string) {
    return this.prisma.shop.findFirst({
      where: {
        id: shopId,
        deletedAt: null
      },
      select: {
        id: true,
        ownerUserId: true
      }
    });
  }

  findOwnedShop(ownerUserId: string, shopId: string) {
    return this.prisma.shop.findFirst({
      where: {
        id: shopId,
        ownerUserId,
        deletedAt: null
      },
      select: {
        id: true
      }
    });
  }

  findAssignedUser(userId: string) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        deletedAt: null
      },
      select: {
        id: true
      }
    });
  }

  addMessage(params: {
    ticketId: string;
    senderId: string;
    body: string;
    isInternalNote: boolean;
    attachmentMediaIds: string[];
  }) {
    return this.prisma.$transaction(async (tx) => {
      await tx.supportMessage.create({
        data: {
          ticketId: params.ticketId,
          senderId: params.senderId,
          body: params.body,
          isInternalNote: params.isInternalNote,
          attachments: {
            create: params.attachmentMediaIds.map((mediaId) => ({
              mediaId
            }))
          }
        }
      });

      return tx.supportTicket.findUniqueOrThrow({
        where: { id: params.ticketId },
        include: supportTicketInclude
      });
    });
  }

  updateStatus(params: {
    ticketId: string;
    status: SupportTicketStatus;
    assignedToId?: string;
  }) {
    return this.prisma.supportTicket.update({
      where: { id: params.ticketId },
      data: {
        status: params.status,
        assignedToId: params.assignedToId,
        resolvedAt: params.status === SupportTicketStatus.RESOLVED ? new Date() : undefined
      },
      include: supportTicketInclude
    });
  }

  private buildWhere(
    filters: SupportTicketFilterDto,
    baseWhere: Prisma.SupportTicketWhereInput = {}
  ): Prisma.SupportTicketWhereInput {
    const filterWhere: Prisma.SupportTicketWhereInput = {
      status: filters.status,
      priority: filters.priority,
      category: filters.category,
      shopId: filters.shopId,
      createdById: filters.userId,
      OR: buildSearchFilters(filters.search)
    };

    return Object.keys(baseWhere).length > 0
      ? {
          AND: [baseWhere, filterWhere]
        }
      : filterWhere;
  }

  private buildOrderBy(
    filters: SupportTicketFilterDto
  ): Prisma.SupportTicketOrderByWithRelationInput {
    const sortOrder = filters.sortOrder ?? 'desc';

    switch (filters.sortBy) {
      case 'updatedAt':
        return { updatedAt: sortOrder };
      case 'priority':
        return { priority: sortOrder };
      case 'status':
        return { status: sortOrder };
      case 'createdAt':
      default:
        return { createdAt: sortOrder };
    }
  }
}

const buildSearchFilters = (search?: string) => {
  const searchTerm = search?.trim();

  if (!searchTerm) {
    return undefined;
  }

  return [
    { ticketNumber: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
    { subject: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
    { description: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } },
    { category: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } }
  ];
};

export type SupportTicketWithRelations = NonNullable<
  Awaited<ReturnType<SupportTicketsRepository['findById']>>
>;
