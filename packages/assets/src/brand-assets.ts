import { createLocaloAssetPath } from './asset-paths';
import type { LocaloAssetMap } from './assets.types';

export type LocaloBrandAssetKey = 'localoLogo' | 'localoLogoTransparent' | 'localoLogoTransparentLight';

export const localoBrandAssets = {
  localoLogo: {
    key: 'localoLogo',
    src: createLocaloAssetPath('brand', 'localo-logo-tight.png'),
    alt: 'Localo logo',
    category: 'brand'
  },
  localoLogoTransparent: {
    key: 'localoLogoTransparent',
    src: createLocaloAssetPath('brand', 'localo-logo-transparent.png'),
    alt: 'Localo transparent logo',
    category: 'brand'
  },
  localoLogoTransparentLight: {
    key: 'localoLogoTransparentLight',
    src: createLocaloAssetPath('brand', 'localo_logo_light.png'),
    alt: 'Localo transparent light logo',
    category: 'brand'
  }
} as const satisfies LocaloAssetMap<LocaloBrandAssetKey>;
