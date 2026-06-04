import type { ReactNode } from 'react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, PageContainer, PageHeader } from '@localo/ui';

export interface PagePlaceholderTemplateProps {
  description: string;
  eyebrow?: string;
  readinessItems?: readonly string[];
  title: string;
  toolbar?: ReactNode;
}

export function PagePlaceholderTemplate({
  description,
  eyebrow = 'Admin foundation',
  readinessItems = ['Route wired', 'Shell layout ready', 'Business workflow pending'],
  title,
  toolbar
}: PagePlaceholderTemplateProps) {
  return (
    <PageContainer className="space-y-6">
      <PageHeader actions={toolbar} description={description} eyebrow={eyebrow} title={title} />

      <Card padding="lg" variant="elevated">
        <CardHeader>
          <CardTitle>{title} workspace</CardTitle>
          <CardDescription>
            This placeholder keeps the route thin and shell-ready while the business screen waits for its dedicated phase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {readinessItems.map((item) => (
              <div key={item} className="rounded-localo-xl border border-localo-border bg-localo-surface-muted p-4">
                <Badge variant="outline">Ready</Badge>
                <p className="mt-3 text-sm font-semibold text-localo-text">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
