import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Role } from '@localo/shared-types';
import { UsersService } from './users.service';

describe('UsersService', () => {
  it('maps users without exposing password or token fields', () => {
    const service = new UsersService({} as never);
    const response = service.toUserResponse({
      id: 'user-1',
      email: 'user@example.com',
      role: Role.CUSTOMER,
      status: 'ACTIVE',
      firstName: 'Local',
      lastName: 'User',
      phone: null,
      createdAt: new Date('2026-01-01T00:00:00.000Z'),
      updatedAt: new Date('2026-01-02T00:00:00.000Z'),
      passwordHash: 'secret-hash',
      refreshTokens: ['token']
    } as never);

    assert.equal(response.id, 'user-1');
    assert.equal(response.email, 'user@example.com');
    assert.equal('passwordHash' in response, false);
    assert.equal('refreshTokens' in response, false);
  });
});

