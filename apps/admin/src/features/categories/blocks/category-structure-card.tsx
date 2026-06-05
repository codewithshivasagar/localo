import { Card, Icon } from '@localo/ui';
import type { AdminCategoryListMetrics } from '../types';

interface CategoryStructureCardProps {
  metrics: AdminCategoryListMetrics;
}

export function CategoryStructureCard({ metrics }: CategoryStructureCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <Icon bg="primary" name="categories" shape="circle" tone="white" wrapperSize={44} />
        <div>
          <h3 className="text-lg font-bold text-localo-text">Category Structure</h3>
          <p className="text-sm text-localo-text-muted">Quick hierarchy snapshot</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Root categories</span>
          <span className="text-lg font-black text-localo-text">{metrics.root}</span>
        </div>
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Subcategories</span>
          <span className="text-lg font-black text-localo-text">{metrics.subcategories}</span>
        </div>
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Active now</span>
          <span className="text-lg font-black text-localo-text">{metrics.active}</span>
        </div>
      </div>
    </Card>
  );
}

