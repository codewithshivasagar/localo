import { Inject, Injectable } from '@nestjs/common';
import { NotificationStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import type { NotificationFilterDto } from './dto/notification-filter.dto';

@Injectable()
export class NotificationsRepository {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  listForUser(userId: string, filters: NotificationFilterDto, skip: number, take: number) {
    const where = this.buildWhere(userId, filters);

    return this.prisma.$transaction([
      this.prisma.notification.count({ where }),
      this.prisma.notification.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: filters.sortOrder ?? 'desc'
        }
      })
    ]);
  }

  markRead(userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId
      },
      data: {
        status: NotificationStatus.READ,
        readAt: new Date()
      }
    });
  }

  findForUser(userId: string, notificationId: string) {
    return this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId
      }
    });
  }

  markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        readAt: null
      },
      data: {
        status: NotificationStatus.READ,
        readAt: new Date()
      }
    });
  }

  private buildWhere(
    userId: string,
    filters: NotificationFilterDto
  ): Prisma.NotificationWhereInput {
    return {
      userId,
      readAt:
        filters.isRead === undefined
          ? undefined
          : filters.isRead
            ? { not: null }
            : null,
      data: filters.type
        ? {
            path: ['type'],
            equals: filters.type
          }
        : undefined
    };
  }
}

export type NotificationRecord = NonNullable<
  Awaited<ReturnType<NotificationsRepository['findForUser']>>
>;

