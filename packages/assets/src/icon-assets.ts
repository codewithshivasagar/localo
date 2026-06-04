import { createLocaloAssetPath } from './asset-paths';
import type { LocaloAssetMap } from './assets.types';

export type LocaloIconAssetKey =
  | 'shop'
  | 'product'
  | 'support'
  | 'commission'
  | 'notification'
  | 'audit';

export const localoIconAssets = {
  shop: {
    key: 'shop',
    src: createLocaloAssetPath('icons', 'shop.png'),
    alt: 'Shop icon',
    category: 'icons'
  },
  product: {
    key: 'product',
    src: createLocaloAssetPath('icons', 'product.png'),
    alt: 'Product icon',
    category: 'icons'
  },
  support: {
    key: 'support',
    src: createLocaloAssetPath('icons', 'support.png'),
    alt: 'Support icon',
    category: 'icons'
  },
  commission: {
    key: 'commission',
    src: createLocaloAssetPath('icons', 'commission.png'),
    alt: 'Commission icon',
    category: 'icons'
  },
  notification: {
    key: 'notification',
    src: createLocaloAssetPath('icons', 'notification.png'),
    alt: 'Notification icon',
    category: 'icons'
  },
  audit: {
    key: 'audit',
    src: createLocaloAssetPath('icons', 'audit.png'),
    alt: 'Audit icon',
    category: 'icons'
  }
} as const satisfies LocaloAssetMap<LocaloIconAssetKey>;
