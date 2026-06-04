import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsRepository } from './shops.repository';
import { ShopsService } from './shops.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsRepository, ShopsService]
})
export class ShopsModule {}
