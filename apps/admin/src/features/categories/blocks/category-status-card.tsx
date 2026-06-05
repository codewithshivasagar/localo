import { Card, Icon, Badge } from '@localo/ui';
import type { CategoryFormState } from '../schemas';

interface CategoryStatusCardProps {
  form: CategoryFormState;
  parentCategoryLabel?: string;
}

export function CategoryStatusCard({ form, parentCategoryLabel }: CategoryStatusCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <Icon bg="primary" name="shield" shape="circle" tone="white" wrapperSize={44} />
        <div>
          <h3 className="text-lg font-bold text-localo-text">Status</h3>
          <p className="text-sm text-localo-text-muted">Visibility and hierarchy snapshot</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Visibility</span>
          <Badge variant={form.isActive ? 'success' : 'muted'}>{form.isActive ? 'Active' : 'Inactive'}</Badge>
        </div>
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Parent</span>
          <span className="text-sm font-bold text-localo-text">{parentCategoryLabel ?? 'Root category'}</span>
        </div>
        <div className="flex items-center justify-between rounded-localo-xl bg-localo-surface-muted/65 px-4 py-3">
          <span className="text-sm font-semibold text-localo-text-muted">Order</span>
          <span className="text-sm font-bold text-localo-text">{form.sortOrder || '0'}</span>
        </div>
      </div>
    </Card>
  );
}

