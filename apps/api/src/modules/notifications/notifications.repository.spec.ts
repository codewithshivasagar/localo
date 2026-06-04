import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { NotificationsRepository } from './notifications.repository';

describe('NotificationsRepository ownership scoping', () => {
  it('lists only current user notifications and supports data.type filtering', async () => {
    let countWhere: unknown;
    let findWhere: unknown;
    const repository = new NotificationsRepository({
      $transaction: async (queries: unknown[]) => queries,
      notification: {
        count: (args: { where: unknown }) => {
          countWhere = args.where;
          return Promise.resolve(0);
        },
        findMany: (args: { where: unknown }) => {
          findWhere = args.where;
          return Promise.resolve([]);
        }
      }
    } as never);

    await repository.listForUser(
      'user-1',
      { type: 'shop.updated', isRead: false, page: 1, limit: 20 },
      0,
      20
    );

    assert.deepEqual(countWhere, {
      userId: 'user-1',
      readAt: null,
      data: { path: ['type'], equals: 'shop.updated' }
    });
    assert.deepEqual(findWhere, countWhere);
  });

  it('marks only current user notifications as read', async () => {
    let updateWhere: unknown;
    const repository = new NotificationsRepository({
      notification: {
        updateMany: (args: { where: unknown }) => {
          updateWhere = args.where;
          return Promise.resolve({ count: 1 });
        }
      }
    } as never);

    await repository.markRead('user-1', 'notification-1');

    assert.deepEqual(updateWhere, {
      id: 'notification-1',
      userId: 'user-1'
    });
  });

  it('marks all read only for the current user', async () => {
    let updateWhere: unknown;
    const repository = new NotificationsRepository({
      notification: {
        updateMany: (args: { where: unknown }) => {
          updateWhere = args.where;
          return Promise.resolve({ count: 1 });
        }
      }
    } as never);

    await repository.markAllRead('user-1');

    assert.deepEqual(updateWhere, {
      userId: 'user-1',
      readAt: null
    });
  });
});

