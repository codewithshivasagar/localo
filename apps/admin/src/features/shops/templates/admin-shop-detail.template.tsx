'use client';

import { Button, EmptyState, ErrorState, Icon, LoadingState, PageContainer } from '@localo/ui';
import {
  ShopAboutCard,
  ShopBusinessHoursCard,
  ShopContactCard,
  ShopDetailHeader,
  ShopDetailTabs,
  ShopHeroCard,
  ShopKeyMetricsCard,
  ShopLocationCard,
  ShopNotesCard,
  ShopQuickActionsCard,
  ShopRecentActivityCard,
  ShopStatusCard
} from '../blocks';
import { useAdminShopDetail } from '../hooks';

interface AdminShopDetailTemplateProps {
  shopId: string;
}

export function AdminShopDetailTemplate({ shopId }: AdminShopDetailTemplateProps) {
  const { error, isLoading, isRefreshing, refresh, shop } = useAdminShopDetail(shopId);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState description="Fetching the latest shop profile and admin metadata." label="Loading shop details" />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState
          action={
            <Button leftIcon={<Icon name="refresh" size="sm" tone="current" />} onClick={refresh} type="button">
              Retry
            </Button>
          }
          description={error}
          title="Unable to load shop details"
        />
      </PageContainer>
    );
  }

  if (!shop) {
    return (
      <PageContainer>
        <EmptyState
          description="The selected shop could not be found or is no longer available."
          title="Shop not found"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="space-y-6">
      <ShopDetailHeader isRefreshing={isRefreshing} onRefresh={refresh} shop={shop} />
      <ShopHeroCard shop={shop} />
      <ShopDetailTabs />

      <section className="grid gap-5 xl:grid-cols-[1fr,24rem]">
        <div className="grid gap-5 lg:grid-cols-2">
          <ShopAboutCard shop={shop} />
          <ShopLocationCard />
          <ShopKeyMetricsCard shop={shop} />
          <ShopBusinessHoursCard />
          <ShopRecentActivityCard shop={shop} />
        </div>
        <aside className="space-y-5">
          <ShopStatusCard shop={shop} />
          <ShopContactCard shop={shop} />
          <ShopQuickActionsCard shopId={shop.id} />
          <ShopNotesCard />
        </aside>
      </section>
    </PageContainer>
  );
}
