import { Badge } from '@localo/ui';

interface ShopApprovalBadgeProps {
  status?: string | null;
}

const variantMap = {
  PENDING: 'warning',
  REJECTED: 'danger',
  UNVERIFIED: 'muted',
  VERIFIED: 'success'
} as const;

function formatLabel(value?: string | null) {
  return value
    ? value.toLowerCase().split('_').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
    : 'Not set';
}

export function ShopApprovalBadge({ status }: ShopApprovalBadgeProps) {
  const variant = status && status in variantMap ? variantMap[status as keyof typeof variantMap] : 'outline';

  return <Badge variant={variant}>{formatLabel(status)}</Badge>;
}
