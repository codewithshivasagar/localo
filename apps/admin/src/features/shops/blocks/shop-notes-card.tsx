import { Button, Card, Icon } from '@localo/ui';

export function ShopNotesCard() {
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-localo-text">Notes</h2>
        <Button disabled leftIcon={<Icon name="plus" size="sm" tone="current" />} size="sm" type="button" variant="outline">
          Add Note
        </Button>
      </div>
      <div className="mt-5 rounded-localo-xl border border-localo-border bg-localo-surface-muted p-4">
        <p className="text-sm leading-6 text-localo-text-muted">Admin notes are not available in the current shop detail response.</p>
      </div>
    </Card>
  );
}
