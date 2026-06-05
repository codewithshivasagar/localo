'use client';

import Link from 'next/link';
import {
  Button,
  ErrorState,
  Icon,
  LoadingState,
  PageContainer,
  PageHeader
} from '@localo/ui';
import {
  ShopFilterToolbar,
  ShopSummaryCards,
  ShopsPagination,
  ShopsTable
} from '../blocks';
import { adminShopRoutes } from '../config';
import { useAdminShopsList } from '../hooks';

export function AdminShopsListTemplate() {
  const {
    error,
    filters,
    hasActiveFilters,
    isLoading,
    isRefreshing,
    metrics,
    pagination,
    refresh,
    resetFilters,
    shops,
    updateFilter
  } = useAdminShopsList();

  return (
    <PageContainer className="space-y-6">
      <PageHeader
        actions={
          <>
            <Button
              disabled={isLoading || isRefreshing}
              isLoading={isRefreshing}
              leftIcon={<Icon name="refresh" size="sm" tone="current" />}
              onClick={refresh}
              type="button"
              variant="outline"
            >
              Refresh
            </Button>
            <Link
              className="inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 rounded-localo-lg bg-localo-primary px-5 text-sm font-bold text-localo-primary-foreground shadow-localo-md shadow-localo-primary/20 transition hover:bg-localo-primary/90 focus:outline-none focus:ring-2 focus:ring-localo-primary/30"
              href={adminShopRoutes.create}
            >
              <Icon name="plus" size="sm" tone="current" />
              Create Shop
            </Link>
          </>
        }
        description="Review approvals, owner details, and operational status across every Localo shop."
        eyebrow="Admin"
        title="Shops"
      />

      <ShopSummaryCards metrics={metrics} />

      <ShopFilterToolbar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        isRefreshing={isRefreshing}
        onReset={resetFilters}
        onUpdateFilter={updateFilter}
      />

      {isLoading ? (
        <LoadingState description="Fetching the latest shop records." label="Loading shops" />
      ) : error ? (
        <ErrorState
          action={
            <Button leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={refresh} type="button">
              Retry
            </Button>
          }
          description={error}
          title="Unable to load shops"
        />
      ) : (
        <>
          <ShopsTable hasActiveFilters={hasActiveFilters} isRefreshing={isRefreshing} shops={shops} />
          <ShopsPagination
            filters={filters}
            isDisabled={isRefreshing}
            meta={pagination}
            onUpdateFilter={updateFilter}
          />
        </>
      )}
    </PageContainer>
  );
}
