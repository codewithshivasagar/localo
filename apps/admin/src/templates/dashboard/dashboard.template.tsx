import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, PageContainer, PageHeader } from '@localo/ui';
import { adminNavigationItems } from '../../config';

const dashboardReadinessCards = [
  {
    label: 'Shell',
    title: 'Desktop-first layout',
    description: 'Sidebar, topbar, and content spacing are ready for admin workflows.'
  },
  {
    label: 'Routes',
    title: 'Thin App Router pages',
    description: 'Each route delegates to templates so business screens can be added cleanly.'
  },
  {
    label: 'Next',
    title: 'Auth phase pending',
    description: 'Login, guards, and current admin state remain intentionally out of UI-6.'
  }
] as const;

export function DashboardTemplate() {
  return (
    <PageContainer className="space-y-6">
      <PageHeader
        description="A clean shell foundation for Localo platform operations. Live metrics and admin workflows will be added in later phases."
        eyebrow="Localo Admin"
        title="Dashboard"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboardReadinessCards.map((card) => (
          <Card key={card.title} padding="lg" variant="elevated">
            <CardHeader>
              <Badge className="mb-3 w-fit" variant="primary">
                {card.label}
              </Badge>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card padding="lg">
        <CardHeader>
          <CardTitle>Admin sections</CardTitle>
          <CardDescription>
            These routes are scaffolded as placeholders only. Tables, filters, forms, and API calls belong to their dedicated phases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {adminNavigationItems.map((item) => (
              <a
                className="rounded-localo-xl border border-localo-border bg-localo-surface-muted p-4 transition hover:border-localo-primary hover:bg-localo-surface"
                href={item.href}
                key={item.href}
              >
                <p className="text-sm font-bold text-localo-text">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-localo-text-muted">{item.description}</p>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
