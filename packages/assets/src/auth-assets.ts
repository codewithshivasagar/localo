import { createLocaloAssetPath } from './asset-paths';
import type { LocaloAssetMap } from './assets.types';

export type LocaloAuthAssetKey =
  | 'shopIllustration'
  | 'adminDashboardIllustration'
  | 'securityShield'
  | 'secureTrusted'
  | 'shopApprovalsIcon'
  | 'catalogControlIcon'
  | 'supportOperationsIcon'
  | 'commissionTrackingIcon';

export const localoAuthAssets = {
  shopIllustration: {
    key: 'shopIllustration',
    src: createLocaloAssetPath('auth', 'localo-shop-illustration.png'),
    alt: 'Shop illustration',
    category: 'auth'
  },
  adminDashboardIllustration: {
    key: 'adminDashboardIllustration',
    src: createLocaloAssetPath('auth', 'localo-admin-dashboard-illustration.png'),
    alt: 'Admin dashboard illustration',
    category: 'auth'
  },
  securityShield: {
    key: 'securityShield',
    src: createLocaloAssetPath('auth', 'localo-security-shield.png'),
    alt: 'Security shield',
    category: 'auth'
  },
  secureTrusted: {
    key: 'secureTrusted',
    src: createLocaloAssetPath('auth', 'secure-trusted-icon.png'),
    alt: 'Secure trusted icon',
    category: 'auth'
  },
  shopApprovalsIcon: {
    key: 'shopApprovalsIcon',
    src: createLocaloAssetPath('auth', 'shop-approvals-icon.png'),
    alt: 'Shop approvals icon',
    category: 'auth'
  },
  catalogControlIcon: {
    key: 'catalogControlIcon',
    src: createLocaloAssetPath('auth', 'catalog-control-icon.png'),
    alt: 'Catalog control icon',
    category: 'auth'
  },
  supportOperationsIcon: {
    key: 'supportOperationsIcon',
    src: createLocaloAssetPath('auth', 'support-operations-icon.png'),
    alt: 'Support operations icon',
    category: 'auth'
  },
  commissionTrackingIcon: {
    key: 'commissionTrackingIcon',
    src: createLocaloAssetPath('auth', 'commission-tracking-icon.png'),
    alt: 'Commission tracking icon',
    category: 'auth'
  }
} as const satisfies LocaloAssetMap<LocaloAuthAssetKey>;
