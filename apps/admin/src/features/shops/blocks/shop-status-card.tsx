import type { ShopResponse } from '@localo/api-client';
import { Card } from '@localo/ui';
import { ShopApprovalBadge } from './shop-approval-badge';
import { ShopStatusBadge } from './shop-status-badge';

interface ShopStatusCardProps {
  shop: ShopResponse;
}

const dateFormatter = new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

function formatDate(value?: string | null) {
  return value ? dateFormatter.format(new Date(value)) : 'Not available';
}

export function ShopStatusCard({ shop }: ShopStatusCardProps) {
  return (
    <Card>
      <h2 className="text-base font-bold text-localo-text">Shop Status & Approval</h2>
      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-localo-text-muted">Status</span>
          <ShopStatusBadge status={shop.status} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-localo-text-muted">Approval</span>
          <ShopApprovalBadge status={shop.verificationStatus} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-localo-text-muted">Approved On</span>
          <span className="text-sm font-semibold text-localo-text">{formatDate(shop.approvedAt)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-localo-text-muted">Visible to Public</span>
          <span className="text-sm font-semibold text-localo-text">{shop.status === 'ACTIVE' && shop.approvedAt ? 'Yes' : 'No'}</span>
        </div>
      </div>
    </Card>
  );
}
