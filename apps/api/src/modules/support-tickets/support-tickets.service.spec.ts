import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { ForbiddenException } from '@nestjs/common';
import { Role } from '@localo/shared-types';
import { SupportTicketsService } from './support-tickets.service';

const ticket = {
  id: 'ticket-1',
  ticketNumber: 'SUP-1',
  createdById: 'creator-1',
  shopId: 'shop-1',
  assignedToId: null,
  category: 'general',
  priority: 'MEDIUM',
  status: 'OPEN',
  subject: 'Need help',
  description: 'Help needed',
  resolvedAt: null,
  createdAt: new Date('2026-01-01T00:00:00.000Z'),
  updatedAt: new Date('2026-01-02T00:00:00.000Z'),
  createdBy: {
    id: 'creator-1',
    fullName: 'Creator',
    email: 'creator@example.com'
  },
  assignedTo: null,
  shop: {
    id: 'shop-1',
    name: 'Owned shop',
    slug: 'owned-shop',
    ownerUserId: 'owner-1'
  },
  messages: []
};

describe('SupportTicketsService access control', () => {
  it('allows users to view tickets they created', async () => {
    const service = new SupportTicketsService(
      { findById: async () => ticket } as never,
      {} as never
    );

    const response = await service.findMine(
      { id: 'creator-1', email: 'creator@example.com', role: Role.CUSTOMER },
      'ticket-1'
    );

    assert.equal(response.id, 'ticket-1');
  });

  it('allows shop owners to view tickets for their own shop', async () => {
    const service = new SupportTicketsService(
      { findById: async () => ticket } as never,
      {} as never
    );

    const response = await service.findMine(
      { id: 'owner-1', email: 'owner@example.com', role: Role.SHOP_OWNER },
      'ticket-1'
    );

    assert.equal(response.shop?.id, 'shop-1');
  });

  it('blocks users from viewing unrelated tickets', async () => {
    const service = new SupportTicketsService(
      { findById: async () => ticket } as never,
      {} as never
    );

    await assert.rejects(
      service.findMine(
        { id: 'other-1', email: 'other@example.com', role: Role.CUSTOMER },
        'ticket-1'
      ),
      ForbiddenException
    );
  });
});

