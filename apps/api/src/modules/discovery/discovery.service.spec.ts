import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BadRequestException } from '@nestjs/common';
import { ProductStatus, ShopStatus } from '@prisma/client';
import { DiscoveryService } from './discovery.service';

describe('DiscoveryService public visibility', () => {
  it('rejects non-active shop status filters', async () => {
    const service = new DiscoveryService({} as never);

    await assert.rejects(
      service.listShops({
        status: ShopStatus.SUSPENDED,
        page: 1,
        limit: 20
      }),
      BadRequestException
    );
  });

  it('rejects non-active product filters for shop product discovery', async () => {
    const service = new DiscoveryService({} as never);

    await assert.rejects(
      service.listShopProducts('shop-1', {
        status: ProductStatus.HIDDEN,
        page: 1,
        limit: 20
      }),
      BadRequestException
    );
  });
});

