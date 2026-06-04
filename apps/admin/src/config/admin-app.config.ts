import { localoBrandAssets } from '@localo/assets';
import { localoAdminTheme } from '@localo/theme';
import { AdminRoutes } from './admin-routes.enum';

export const adminAppConfig = {
  brand: {
    logo: localoBrandAssets.logoMark,
    name: 'Localo Admin',
    tagline: 'Marketplace operations console'
  },
  defaultRoute: AdminRoutes.Dashboard,
  shell: {
    sidebarWidth: '18rem'
  },
  theme: localoAdminTheme
} as const;
