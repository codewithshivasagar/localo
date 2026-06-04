export type LocaloAssetCategory = 'brand' | 'auth' | 'illustrations' | 'icons';

export interface LocaloAsset {
  key: string;
  src: string;
  alt: string;
  category: LocaloAssetCategory;
  width?: number;
  height?: number;
}

export type LocaloAssetMap<T extends string = string> = Record<T, LocaloAsset>;
