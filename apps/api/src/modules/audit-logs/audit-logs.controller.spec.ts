import 'reflect-metadata';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Role } from '@localo/shared-types';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { AuditLogsController } from './audit-logs.controller';

describe('AuditLogsController', () => {
  it('is restricted to admin roles', () => {
    const roles = Reflect.getMetadata(ROLES_KEY, AuditLogsController);

    assert.deepEqual(roles, [Role.ADMIN, Role.SUPER_ADMIN]);
  });
});

