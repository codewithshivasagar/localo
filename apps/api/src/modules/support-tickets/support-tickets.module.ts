import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import {
  AdminSupportTicketsController,
  SupportTicketsController
} from './support-tickets.controller';
import { SupportTicketsRepository } from './support-tickets.repository';
import { SupportTicketsService } from './support-tickets.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [SupportTicketsController, AdminSupportTicketsController],
  providers: [SupportTicketsService, SupportTicketsRepository]
})
export class SupportTicketsModule {}
