import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import {
  AdminCommissionController,
  ShopOwnerCommissionController
} from './commission.controller';
import { CommissionRepository } from './commission.repository';
import { CommissionService } from './commission.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [AdminCommissionController, ShopOwnerCommissionController],
  providers: [CommissionService, CommissionRepository]
})
export class CommissionModule {}
