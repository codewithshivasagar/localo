'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ShopResponse } from '@localo/api-client';
import {
  Badge,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  EmptyState,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from '@localo/ui';
import { adminShopRoutes } from '../config';

interface ShopsTableProps {
  hasActiveFilters: boolean;
  isRefreshing: boolean;
  shops: ShopResponse[];
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
});

const statusVariantMap = {
  ACTIVE: 'success',
  CLOSED: 'muted',
  DRAFT: 'muted',
  PAUSED: 'warning',
  PENDING_REVIEW: 'warning',
  REJECTED: 'danger',
  SUSPENDED: 'danger'
} as const;

const approvalVariantMap = {
  PENDING: 'warning',
  REJECTED: 'danger',
  UNVERIFIED: 'muted',
  VERIFIED: 'success'
} as const;

function formatLabel(value?: string | null): string {
  if (!value) {
    return 'Not set';
  }

  return value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(value?: string | null): string {
  if (!value) {
    return 'Not set';
  }

  return dateFormatter.format(new Date(value));
}

function resolveRating(shop: ShopResponse): string {
  if (!shop.ratingAvg) {
    return 'No rating';
  }

  return `${Number(shop.ratingAvg).toFixed(1)} (${shop.ratingCount ?? 0})`;
}

function statusVariant(status?: string | null) {
  return status && status in statusVariantMap
    ? statusVariantMap[status as keyof typeof statusVariantMap]
    : 'outline';
}

function approvalVariant(status?: string | null) {
  return status && status in approvalVariantMap
    ? approvalVariantMap[status as keyof typeof approvalVariantMap]
    : 'outline';
}

export function ShopsTable({ hasActiveFilters, isRefreshing, shops }: ShopsTableProps) {
  const [openMenuShopId, setOpenMenuShopId] = useState<string | null>(null);

  if (shops.length === 0) {
    return (
      <Card>
        <EmptyState
          action={null}
          description={
            hasActiveFilters
              ? 'Try clearing the search or status filters to see more shops.'
              : 'Create the first shop once the admin create flow is ready.'
          }
          title={hasActiveFilters ? 'No shops match these filters' : 'No shops yet'}
        />
      </Card>
    );
  }

  return (
    <Card className="overflow-visible" padded={false}>
      <div className="flex flex-col gap-2 border-b border-localo-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black text-localo-text">All Shops</h2>
          <p className="text-sm text-localo-text-muted">
            Review approval state, ownership, and shop health from one place.
          </p>
        </div>
        {isRefreshing ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-localo-primary">
            <Icon name="refresh" size="sm" tone="primary" />
            Refreshing
          </div>
        ) : null}
      </div>
      <TableContainer className="rounded-none border-0 shadow-none">
        <Table className="min-w-[74rem]">
          <TableHeader>
            <TableRow>
              <TableHead>Shop</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approval</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map((shop) => (
              <TableRow className="hover:bg-localo-surface-muted/60" key={shop.id}>
                <TableCell>
                  <div className="flex min-w-64 items-center gap-3">
                    <Icon bg="success" name="shop" shape="rounded" tone="primary" wrapperSize="lg" />
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-localo-text">{shop.name}</p>
                      <p className="truncate text-xs text-localo-text-muted">
                        {shop.primaryCategory?.name ?? shop.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-44">
                    <p className="truncate font-medium text-localo-text">
                      {shop.owner?.fullName ?? 'Not assigned'}
                    </p>
                    <p className="truncate text-xs text-localo-text-muted">
                      {shop.owner?.email ?? 'Owner pending'}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-32 items-center gap-2 text-sm text-localo-text-muted">
                    <Icon name="mapPin" size="sm" tone="muted" />
                    Location pending
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(shop.status)}>{formatLabel(shop.status)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={approvalVariant(shop.verificationStatus)}>
                    {formatLabel(shop.verificationStatus)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-localo-text-muted">-</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm text-localo-text">
                    <Icon name="star" size="xs" tone="warning" />
                    {resolveRating(shop)}
                  </div>
                </TableCell>
                <TableCell>{formatDate(shop.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      aria-label={`View ${shop.name}`}
                      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface text-localo-text-muted shadow-sm transition hover:border-localo-primary hover:text-localo-primary"
                      href={adminShopRoutes.detail(shop.id)}
                    >
                      <Icon name="eye" size="sm" tone="current" />
                    </Link>
                    <Link
                      aria-label={`Edit ${shop.name}`}
                      className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface text-localo-text-muted shadow-sm transition hover:border-localo-primary hover:text-localo-primary"
                      href={adminShopRoutes.edit(shop.id)}
                    >
                      <Icon name="edit" size="sm" tone="current" />
                    </Link>
                    <Dropdown>
                      <DropdownTrigger
                        aria-label={`More actions for ${shop.name}`}
                        className="min-h-10 min-w-10 px-0"
                        onClick={() => setOpenMenuShopId((currentId) => (currentId === shop.id ? null : shop.id))}
                        type="button"
                      >
                        <Icon name="moreHorizontal" size="sm" tone="current" />
                      </DropdownTrigger>
                      {openMenuShopId === shop.id ? (
                        <DropdownMenu>
                          <DropdownItem disabled type="button">
                            More actions coming soon
                          </DropdownItem>
                        </DropdownMenu>
                      ) : null}
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
