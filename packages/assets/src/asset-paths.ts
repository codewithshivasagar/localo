import type { LocaloAssetCategory } from './assets.types';

export const LOCALO_ASSET_PUBLIC_ROOT = '/assets/localo' as const;

export const localoAssetPaths = {
  brand: `${LOCALO_ASSET_PUBLIC_ROOT}/brand`,
  auth: `${LOCALO_ASSET_PUBLIC_ROOT}/auth`,
  illustrations: `${LOCALO_ASSET_PUBLIC_ROOT}/illustrations`,
  icons: `${LOCALO_ASSET_PUBLIC_ROOT}/icons`
} as const satisfies Record<LocaloAssetCategory, string>;

export function createLocaloAssetPath(
  category: LocaloAssetCategory,
  fileName: string
): string {
  const normalizedFileName = fileName.replace(/^\/+/, '');

  return `${localoAssetPaths[category]}/${normalizedFileName}`;
}
