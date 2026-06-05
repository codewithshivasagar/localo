import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { normalizePagination } from '../../common/pagination/pagination';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { NotificationFilterDto } from './dto/notification-filter.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import {
  NotificationsRepository,
  type NotificationRecord
} from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(@Inject(NotificationsRepository) private readonly notificationsRepository: NotificationsRepository) {}

  async list(
    user: AuthenticatedUser,
    filters: NotificationFilterDto
  ): Promise<PaginationResponse<NotificationResponseDto>> {
    const { page, limit, skip } = normalizePagination(filters.page, filters.limit, {
      defaultPage: 1,
      defaultLimit: 10,
      maxLimit: 100
    });
    const [total, notifications] = await this.notificationsRepository.listForUser(
      user.id,
      filters,
      skip,
      limit
    );

    return {
      success: true,
      message: 'Notifications fetched successfully',
      data: notifications.map(toNotificationResponse),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async markRead(
    user: AuthenticatedUser,
    notificationId: string
  ): Promise<NotificationResponseDto> {
    const result = await this.notificationsRepository.markRead(user.id, notificationId);

    if (result.count === 0) {
      throw new NotFoundException('Notification not found');
    }

    const notification = await this.notificationsRepository.findForUser(
      user.id,
      notificationId
    );

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return toNotificationResponse(notification);
  }

  async markAllRead(user: AuthenticatedUser) {
    const result = await this.notificationsRepository.markAllRead(user.id);

    return {
      updatedCount: result.count
    };
  }
}

const toNotificationResponse = (
  notification: NotificationRecord
): NotificationResponseDto => ({
  id: notification.id,
  channel: notification.channel,
  title: notification.title,
  body: notification.body,
  data: notification.data,
  status: notification.status,
  isRead: notification.readAt !== null,
  readAt: notification.readAt?.toISOString() ?? null,
  sentAt: notification.sentAt?.toISOString() ?? null,
  createdAt: notification.createdAt.toISOString()
});
