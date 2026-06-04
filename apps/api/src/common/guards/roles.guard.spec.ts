import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ExecutionContext } from '@nestjs/common';
import { Role } from '@localo/shared-types';
import { RolesGuard } from './roles.guard';

const contextFor = (user?: { id: string; email: string; role: Role }) =>
  ({
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({
      getRequest: () => ({ user })
    })
  }) as ExecutionContext;

describe('RolesGuard', () => {
  it('allows requests when no roles are required', () => {
    const guard = new RolesGuard({
      getAllAndOverride: () => undefined
    } as never);

    assert.equal(guard.canActivate(contextFor()), true);
  });

  it('allows users with a required role', () => {
    const guard = new RolesGuard({
      getAllAndOverride: () => [Role.ADMIN]
    } as never);

    assert.equal(
      guard.canActivate(
        contextFor({ id: 'admin-1', email: 'admin@example.com', role: Role.ADMIN })
      ),
      true
    );
  });

  it('denies users without a required role', () => {
    const guard = new RolesGuard({
      getAllAndOverride: () => [Role.ADMIN]
    } as never);

    assert.equal(
      guard.canActivate(
        contextFor({
          id: 'customer-1',
          email: 'customer@example.com',
          role: Role.CUSTOMER
        })
      ),
      false
    );
  });
});

