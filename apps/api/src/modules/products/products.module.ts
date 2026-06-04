import { Module } from '@nestjs/common';
import {
  PublicProductsController,
  ShopOwnerProductsController
} from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  controllers: [PublicProductsController, ShopOwnerProductsController],
  providers: [ProductsService, ProductsRepository]
})
export class ProductsModule {}
