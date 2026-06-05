import { Card, Icon } from '@localo/ui';

export function CategoryGuidelinesCard() {
  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <Icon bg="warning" name="alert" shape="circle" tone="warning" wrapperSize={44} />
        <div>
          <h3 className="text-lg font-bold text-localo-text">Category Tips</h3>
          <p className="text-sm text-localo-text-muted">Keep category data consistent and searchable.</p>
        </div>
      </div>
      <ul className="space-y-3 text-sm leading-6 text-localo-text-muted">
        <li>Use short, descriptive names that match storefront navigation.</li>
        <li>Keep slugs lowercase with hyphens only for stable URLs.</li>
        <li>Prefer root categories for major areas and subcategories for detail.</li>
        <li>Use the active toggle to hide categories without deleting them.</li>
      </ul>
    </Card>
  );
}

