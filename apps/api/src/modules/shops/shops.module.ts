import { Module } from '@nestjs/common';
import { AuditLogsModule } from '../audit-logs/audit-logs.module';
import { ShopsController } from './shops.controller';
import { ShopsRepository } from './shops.repository';
import { ShopsService } from './shops.service';

@Module({
  imports: [AuditLogsModule],
  controllers: [ShopsController],
  providers: [ShopsRepository, ShopsService]
})
export class ShopsModule {}
