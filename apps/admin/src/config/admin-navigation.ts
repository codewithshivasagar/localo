import { AdminRoutes } from './admin-routes.enum';

export interface AdminNavigationItem {
  description: string;
  href: AdminRoutes;
  label: string;
  shortLabel: string;
}

export const adminNavigationItems = [
  {
    description: 'Operations overview',
    href: AdminRoutes.Dashboard,
    label: 'Dashboard',
    shortLabel: 'DB'
  },
  {
    description: 'Shop approvals and owner assignment',
    href: AdminRoutes.Shops,
    label: 'Shops',
    shortLabel: 'SH'
  },
  {
    description: 'Catalog category governance',
    href: AdminRoutes.Categories,
    label: 'Categories',
    shortLabel: 'CA'
  },
  {
    description: 'Reusable media assets and category visuals',
    href: AdminRoutes.Media,
    label: 'Media',
    shortLabel: 'ME'
  },
  {
    description: 'Customer and shop-owner support queue',
    href: AdminRoutes.SupportTickets,
    label: 'Support Tickets',
    shortLabel: 'ST'
  },
  {
    description: 'Commission settings and ledger readiness',
    href: AdminRoutes.Commission,
    label: 'Commission',
    shortLabel: 'CO'
  },
  {
    description: 'Operational audit visibility',
    href: AdminRoutes.AuditLogs,
    label: 'Audit Logs',
    shortLabel: 'AL'
  },
  {
    description: 'Platform settings foundation',
    href: AdminRoutes.Settings,
    label: 'Settings',
    shortLabel: 'SE'
  }
] as const satisfies AdminNavigationItem[];
