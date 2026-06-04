import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { UnauthorizedException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { Role } from '@localo/shared-types';
import { AuthService } from './auth.service';

const activeUser = async () => ({
  id: 'user-1',
  email: 'user@example.com',
  role: Role.CUSTOMER,
  status: 'ACTIVE',
  passwordHash: await hash('correct-password', 4),
  firstName: 'Local',
  lastName: 'User',
  phone: null,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  deletedAt: null
});

const createService = async (user?: Awaited<ReturnType<typeof activeUser>>) => {
  const testUser = user ?? (await activeUser());
  const refreshTokenCreates: unknown[] = [];
  const refreshTokenRevocations: unknown[] = [];
  const configService = {
    get: (key: string) => (key === 'jwt.refreshExpiresIn' ? '7d' : '15m'),
    getOrThrow: (key: string) => `${key}-secret`
  };
  const jwtService = {
    signAsync: async (payload: { tokenId?: string }) =>
      payload.tokenId ? 'refresh-token' : 'access-token',
    verifyAsync: async () => ({
      sub: testUser.id,
      email: testUser.email,
      role: testUser.role,
      tokenId: 'refresh-token-id'
    })
  };
  const prisma = {
    refreshToken: {
      create: async (args: unknown) => refreshTokenCreates.push(args),
      findFirst: async () => ({
        id: 'refresh-token-id',
        userId: testUser.id,
        tokenHash: await hash('refresh-token', 4),
        expiresAt: new Date(Date.now() + 60_000),
        user: testUser
      }),
      updateMany: async (args: unknown) => {
        refreshTokenRevocations.push(args);
        return { count: 1 };
      }
    }
  };
  const usersService = {
    findByEmailWithPassword: async () => testUser,
    toUserResponse: (source: typeof testUser) => ({
      id: source.id,
      email: source.email,
      role: source.role,
      status: source.status,
      firstName: source.firstName,
      lastName: source.lastName,
      phone: source.phone,
      createdAt: source.createdAt.toISOString(),
      updatedAt: source.updatedAt.toISOString()
    })
  };

  return {
    service: new AuthService(
      configService as never,
      jwtService as never,
      prisma as never,
      usersService as never
    ),
    refreshTokenCreates,
    refreshTokenRevocations
  };
};

describe('AuthService', () => {
  it('logs in active users with valid credentials without exposing passwordHash', async () => {
    const { service, refreshTokenCreates } = await createService();

    const response = await service.login('user@example.com', 'correct-password');

    assert.equal(response.tokens.accessToken, 'access-token');
    assert.equal(response.tokens.refreshToken, 'refresh-token');
    assert.equal('passwordHash' in response.user, false);
    assert.equal(refreshTokenCreates.length, 1);
  });

  it('rejects invalid login credentials', async () => {
    const { service } = await createService();

    await assert.rejects(
      service.login('user@example.com', 'wrong-password'),
      UnauthorizedException
    );
  });

  it('rotates refresh tokens by revoking the old token and issuing a new one', async () => {
    const { service, refreshTokenCreates, refreshTokenRevocations } =
      await createService();

    const response = await service.refresh('refresh-token');

    assert.equal(response.tokens.refreshToken, 'refresh-token');
    assert.equal(refreshTokenRevocations.length, 1);
    assert.equal(refreshTokenCreates.length, 1);
  });
});
