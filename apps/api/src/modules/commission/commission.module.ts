import { Module } from '@nestjs/common';
import {
  AdminCommissionController,
  ShopOwnerCommissionController
} from './commission.controller';
import { CommissionRepository } from './commission.repository';
import { CommissionService } from './commission.service';

@Module({
  controllers: [AdminCommissionController, ShopOwnerCommissionController],
  providers: [CommissionService, CommissionRepository]
})
export class CommissionModule {}

