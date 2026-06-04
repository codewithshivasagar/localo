import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { AdminRootTemplate, AdminShellTemplate } from '../templates';
import './globals.css';

export const metadata: Metadata = {
  title: 'Localo Admin',
  description: 'Localo marketplace operations console'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminRootTemplate>
          <AdminShellTemplate>{children}</AdminShellTemplate>
        </AdminRootTemplate>
      </body>
    </html>
  );
}
