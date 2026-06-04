import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { BadRequestException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Role } from '@localo/shared-types';
import { ShopsService } from './shops.service';

describe('ShopsService admin rules', () => {
  it('rejects admin shop creation for users that cannot own shops', async () => {
    const service = new ShopsService(
      {
        findOwnerCandidate: async () => ({
          id: 'admin-2',
          role: UserRole.ADMIN,
          userType: UserRole.ADMIN,
          status: 'ACTIVE'
        })
      } as never,
      { recordSafe: async () => undefined } as never
    );

    await assert.rejects(
      service.create(
        {
          ownerUserId: 'admin-2',
          name: 'Invalid owner shop'
        } as never,
        { id: 'admin-1', email: 'admin@example.com', role: Role.ADMIN }
      ),
      BadRequestException
    );
  });
});

