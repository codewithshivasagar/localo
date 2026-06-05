import type { MediaTypeFilter } from '../types/media.types';

export const MEDIA_MANAGER_COPY = {
  title: 'Media Manager',
  description: 'Manage reusable images, SVGs, documents, and category visuals.',
  uploadHelper:
    'Upload reusable images, SVGs, and documents. Tag category visuals with category-image.',
  uploadUnavailableHelper: 'Upload API will be added next.'
} as const;

export const MEDIA_TYPE_FILTER_OPTIONS: readonly {
  label: string;
  value: MediaTypeFilter;
}[] = [
  { label: 'All', value: 'all' },
  { label: 'Images', value: 'images' },
  { label: 'SVGs', value: 'svgs' },
  { label: 'Documents', value: 'documents' }
] as const;

export const MEDIA_TAG_CATEGORY_IMAGE = 'category-image';
export const MEDIA_PAGE_SIZE_OPTIONS = [
  { label: '12', value: '12' },
  { label: '24', value: '24' },
  { label: '48', value: '48' }
];

export const MEDIA_SUMMARY_DEFAULTS = {
  total: 0,
  images: 0,
  svgs: 0,
  documents: 0
} as const;
