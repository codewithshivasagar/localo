import { createLocaloAssetPath } from './asset-paths';
import type { LocaloAssetMap } from './assets.types';

export type LocaloIllustrationAssetKey = 'emptyState' | 'notFound' | 'serverError' | 'comingSoon';

export const localoIllustrationAssets = {
  emptyState: {
    key: 'emptyState',
    src: createLocaloAssetPath('illustrations', 'empty-state.png'),
    alt: 'Empty state illustration',
    category: 'illustrations'
  },
  notFound: {
    key: 'notFound',
    src: createLocaloAssetPath('illustrations', 'not-found.png'),
    alt: 'Not found illustration',
    category: 'illustrations'
  },
  serverError: {
    key: 'serverError',
    src: createLocaloAssetPath('illustrations', 'server-error.png'),
    alt: 'Server error illustration',
    category: 'illustrations'
  },
  comingSoon: {
    key: 'comingSoon',
    src: createLocaloAssetPath('illustrations', 'coming-soon.png'),
    alt: 'Coming soon illustration',
    category: 'illustrations'
  }
} as const satisfies LocaloAssetMap<LocaloIllustrationAssetKey>;
