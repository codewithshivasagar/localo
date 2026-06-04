import { createLocaloAssetPath } from './asset-paths';
import type { LocaloAssetMap } from './assets.types';

export type LocaloBrandAssetKey = 'logoMark' | 'logoHorizontal' | 'themeReference';

export const localoBrandAssets = {
  logoMark: {
    key: 'logoMark',
    src: createLocaloAssetPath('brand', 'localo-logo-mark.png'),
    alt: 'Localo logo mark',
    category: 'brand'
  },
  logoHorizontal: {
    key: 'logoHorizontal',
    src: createLocaloAssetPath('brand', 'localo-logo-horizontal.png'),
    alt: 'Localo horizontal logo',
    category: 'brand'
  },
  themeReference: {
    key: 'themeReference',
    src: createLocaloAssetPath('brand', 'localo-theme.png'),
    alt: 'Localo theme reference',
    category: 'brand'
  }
} as const satisfies LocaloAssetMap<LocaloBrandAssetKey>;
