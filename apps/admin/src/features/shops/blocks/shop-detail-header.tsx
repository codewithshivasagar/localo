'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ShopResponse } from '@localo/api-client';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Icon, PageHeader } from '@localo/ui';
import { adminShopRoutes } from '../config';
import { ShopStatusBadge } from './shop-status-badge';

interface ShopDetailHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
  shop: ShopResponse;
}

export function ShopDetailHeader({ isRefreshing, onRefresh, shop }: ShopDetailHeaderProps) {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  return (
    <div className="space-y-5">
      <Link className="inline-flex items-center gap-2 text-sm font-semibold text-localo-text-muted hover:text-localo-primary" href={adminShopRoutes.list}>
        <Icon name="chevronLeft" size="sm" tone="current" />
        Back to Shops
      </Link>
      <PageHeader
        actions={
          <>
            <Button isLoading={isRefreshing} leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={onRefresh} type="button" variant="outline">
              Refresh
            </Button>
            <Link className="inline-flex min-h-11 items-center justify-center gap-2 rounded-localo-md border border-localo-border bg-localo-surface px-4 text-sm font-semibold text-localo-text shadow-localo-sm hover:bg-localo-surface-muted" href={adminShopRoutes.edit(shop.id)}>
              <Icon name="edit" size="sm" tone="current" />
              Edit Shop
            </Link>
            <Dropdown>
              <DropdownTrigger onClick={() => setIsActionsOpen((isOpen) => !isOpen)} type="button">
                Actions
                <Icon name="chevronDown" size="sm" tone="current" />
              </DropdownTrigger>
              {isActionsOpen ? (
                <DropdownMenu>
                  <DropdownItem disabled>Change status coming soon</DropdownItem>
                  <DropdownItem disabled>Assign owner coming soon</DropdownItem>
                </DropdownMenu>
              ) : null}
            </Dropdown>
            <Button disabled leftIcon={<Icon name="plus" size="sm" tone="current" />} title="Products UI is planned for UI-8.4" type="button">
              Add Product
            </Button>
          </>
        }
        description={`${shop.slug}${shop.primaryCategory?.name ? ` • ${shop.primaryCategory.name}` : ''}`}
        title={
          <span className="inline-flex flex-wrap items-center gap-3">
            {shop.name}
            <ShopStatusBadge status={shop.status} />
          </span>
        }
      />
    </div>
  );
}
