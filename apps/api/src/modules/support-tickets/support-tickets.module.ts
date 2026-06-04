import { Module } from '@nestjs/common';
import {
  AdminSupportTicketsController,
  SupportTicketsController
} from './support-tickets.controller';
import { SupportTicketsRepository } from './support-tickets.repository';
import { SupportTicketsService } from './support-tickets.service';

@Module({
  controllers: [SupportTicketsController, AdminSupportTicketsController],
  providers: [SupportTicketsService, SupportTicketsRepository]
})
export class SupportTicketsModule {}

