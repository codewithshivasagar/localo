import type { ReactNode } from 'react';

export interface AdminRootTemplateProps {
  children: ReactNode;
}

export function AdminRootTemplate({ children }: AdminRootTemplateProps) {
  return (
    <div className="min-h-dvh bg-localo-background text-localo-text">
      {children}
    </div>
  );
}
