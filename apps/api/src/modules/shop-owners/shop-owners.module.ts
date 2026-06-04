import { Module } from '@nestjs/common';
import { ShopOwnersController } from './shop-owners.controller';
import { ShopOwnersRepository } from './shop-owners.repository';
import { ShopOwnersService } from './shop-owners.service';

@Module({
  controllers: [ShopOwnersController],
  providers: [ShopOwnersRepository, ShopOwnersService]
})
export class ShopOwnersModule {}
