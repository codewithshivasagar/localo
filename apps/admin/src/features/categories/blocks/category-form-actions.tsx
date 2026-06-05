import Link from 'next/link';
import { Button } from '@localo/ui';
import { adminCategoryRoutes } from '../config';

interface CategoryFormActionsProps {
  categoryId?: string;
  isEditMode: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export function CategoryFormActions({
  categoryId,
  isEditMode,
  isSubmitting,
  onSubmit
}: CategoryFormActionsProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-localo-border pt-5 sm:flex-row sm:items-center sm:justify-end">
      <Button
        className="sm:order-2"
        isLoading={isSubmitting}
        loadingLabel={isEditMode ? 'Saving changes...' : 'Creating category...'}
        onClick={onSubmit}
        type="button"
        variant="primary"
      >
        {isEditMode ? 'Save Changes' : 'Create Category'}
      </Button>
      <Link
        className="inline-flex min-h-11 items-center justify-center rounded-localo-lg border border-localo-border bg-localo-surface px-5 text-sm font-bold text-localo-text shadow-localo-sm transition hover:bg-localo-surface-muted sm:order-1"
        href={adminCategoryRoutes.list}
      >
        Cancel
      </Link>
      {categoryId ? <span className="sr-only">Editing {categoryId}</span> : null}
    </div>
  );
}
