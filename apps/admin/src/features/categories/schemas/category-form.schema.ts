import type { CategoryResponse } from '@localo/api-client';

export const categorySlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface CategoryFormState {
  description: string;
  iconMediaId: string;
  imageMediaId: string;
  isActive: boolean;
  name: string;
  parentId: string;
  sortOrder: string;
  slug: string;
}

export const initialCategoryFormState: CategoryFormState = {
  description: '',
  iconMediaId: '',
  imageMediaId: '',
  isActive: true,
  name: '',
  parentId: '',
  sortOrder: '',
  slug: ''
};

export function createCategorySlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isOptionalNumber(value: string) {
  return !value || /^\d+$/.test(value);
}

export function isCategoryFormValid(form: CategoryFormState) {
  return Boolean(form.name.trim()) && categorySlugRegex.test(form.slug) && isOptionalNumber(form.sortOrder);
}

export function toCategoryFormState(category: CategoryResponse): CategoryFormState {
  return {
    description: category.description ?? '',
    iconMediaId: category.iconMedia?.id ?? '',
    imageMediaId: category.imageMedia?.id ?? '',
    isActive: category.isActive,
    name: category.name,
    parentId: category.parentId ?? '',
    sortOrder: String(category.sortOrder ?? ''),
    slug: category.slug
  };
}

