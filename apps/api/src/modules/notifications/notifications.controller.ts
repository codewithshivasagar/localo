import { Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { ApiResponse } from '../../common/responses/api-response.type';
import type { PaginationResponse } from '../../common/responses/pagination-response.type';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { NotificationFilterDto } from './dto/notification-filter.dto';
import {
  NotificationEnvelopeResponseDto,
  NotificationListResponseDto,
  NotificationResponseDto
} from './dto/notification-response.dto';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(@Inject(NotificationsService) private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List my notifications' })
  @ApiOkResponse({ type: NotificationListResponseDto })
  list(
    @CurrentUser() user: AuthenticatedUser,
    @Query() filters: NotificationFilterDto
  ): Promise<PaginationResponse<NotificationResponseDto>> {
    return this.notificationsService.list(user, filters);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark one of my notifications as read' })
  @ApiOkResponse({ type: NotificationEnvelopeResponseDto })
  async markRead(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<NotificationResponseDto>> {
    const notification = await this.notificationsService.markRead(user, id);

    return {
      success: true,
      message: 'Notification marked as read successfully',
      data: notification
    };
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all of my notifications as read' })
  async markAllRead(@CurrentUser() user: AuthenticatedUser) {
    const data = await this.notificationsService.markAllRead(user);

    return {
      success: true,
      message: 'Notifications marked as read successfully',
      data
    };
  }
}

