import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NotFoundException } from '@nestjs/common';
import { Role } from '@localo/shared-types';
import { ShopOwnersService } from './shop-owners.service';

describe('ShopOwnersService ownership', () => {
  it('requires the authenticated user to own a shop before updating profile fields', async () => {
    const service = new ShopOwnersService({
      findOwnedShop: async () => null
    } as never);

    await assert.rejects(
      service.updateOwnShop(
        { id: 'owner-1', email: 'owner@example.com', role: Role.SHOP_OWNER },
        { name: 'Updated shop' }
      ),
      NotFoundException
    );
  });
});

