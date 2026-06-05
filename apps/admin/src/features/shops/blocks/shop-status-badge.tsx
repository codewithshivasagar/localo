import { Badge } from '@localo/ui';

interface ShopStatusBadgeProps {
  status?: string | null;
}

const variantMap = {
  ACTIVE: 'success',
  CLOSED: 'muted',
  DRAFT: 'muted',
  PAUSED: 'warning',
  PENDING_REVIEW: 'warning',
  REJECTED: 'danger',
  SUSPENDED: 'danger'
} as const;

function formatLabel(value?: string | null) {
  return value
    ? value.toLowerCase().split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    : 'Not set';
}

export function ShopStatusBadge({ status }: ShopStatusBadgeProps) {
  const variant = status && status in variantMap ? variantMap[status as keyof typeof variantMap] : 'outline';

  return <Badge variant={variant}>{formatLabel(status)}</Badge>;
}
