import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { Role } from '@localo/shared-types';
import { ProductsService } from './products.service';

describe('ProductsService ownership and public visibility', () => {
  it('rejects non-active public product visibility filters', async () => {
    const service = new ProductsService({} as never);

    await assert.rejects(
      service.listPublic({
        status: ProductStatus.HIDDEN,
        page: 1,
        limit: 20
      }),
      BadRequestException
    );
  });

  it('scopes owned product lookup to the authenticated owner shop', async () => {
    const calls: unknown[] = [];
    const service = new ProductsService({
      findOwnedShop: async () => ({ id: 'shop-1' }),
      findOwnedById: async (productId: string, shopId: string) => {
        calls.push({ productId, shopId });
        return null;
      }
    } as never);

    await assert.rejects(
      service.findOwned(
        { id: 'owner-1', email: 'owner@example.com', role: Role.SHOP_OWNER },
        'product-1'
      ),
      NotFoundException
    );
    assert.deepEqual(calls, [{ productId: 'product-1', shopId: 'shop-1' }]);
  });

  it('prevents shop owners from setting admin-only rejected status', async () => {
    const service = new ProductsService({} as never);

    await assert.rejects(
      service.updateStatusForOwner(
        { id: 'owner-1', email: 'owner@example.com', role: Role.SHOP_OWNER },
        'product-1',
        { status: ProductStatus.REJECTED }
      ),
      BadRequestException
    );
  });
});

