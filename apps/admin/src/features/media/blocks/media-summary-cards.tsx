import { Badge, Card, Icon } from '@localo/ui';

interface MediaSummaryCardsProps {
  documents: number;
  images: number;
  svgs: number;
  total: number;
}

const cards = [
  {
    label: 'Total Media',
    icon: 'image',
    key: 'total',
    variant: 'outline'
  },
  {
    label: 'Images',
    icon: 'image',
    key: 'images',
    variant: 'success'
  },
  {
    label: 'SVGs',
    icon: 'categories',
    key: 'svgs',
    variant: 'primary'
  },
  {
    label: 'Documents',
    icon: 'note',
    key: 'documents',
    variant: 'warning'
  }
] as const;

export function MediaSummaryCards({ documents, images, svgs, total }: MediaSummaryCardsProps) {
  const values = { documents, images, svgs, total };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.key} className="overflow-hidden" padding="lg" variant="elevated">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-localo-text-muted">{card.label}</p>
              <p className="mt-2 text-3xl font-black tracking-tight text-localo-text">{values[card.key]}</p>
              <p className="mt-1 text-xs font-medium text-localo-text-muted">Reusable assets in the library</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-localo-2xl bg-localo-surface-muted text-localo-primary">
              <Icon name={card.icon} size="md" tone="current" />
            </div>
          </div>
          <Badge className="mt-4 w-fit" variant={card.variant}>
            {card.label}
          </Badge>
        </Card>
      ))}
    </div>
  );
}
