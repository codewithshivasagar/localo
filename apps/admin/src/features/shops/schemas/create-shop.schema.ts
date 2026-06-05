import { createShopStepIds, type CreateShopStepId } from '../config';

export const shopSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface CreateShopFormState {
  accountHolderName: string;
  addressLine1: string;
  addressLine2: string;
  area: string;
  bankAccountNumber: string;
  categoryId: string;
  city: string;
  country: string;
  email: string;
  fullDescription: string;
  gstNumber: string;
  ifsc: string;
  landmark: string;
  latitude: string;
  longitude: string;
  pan: string;
  phone: string;
  postalCode: string;
  searchAddress: string;
  shortDescription: string;
  slug: string;
  state: string;
  tags: string;
  upiId: string;
  website: string;
  name: string;
  ownerUserId: string;
  isFeatured: boolean;
}

export const initialCreateShopFormState: CreateShopFormState = {
  accountHolderName: '',
  addressLine1: '',
  addressLine2: '',
  area: '',
  bankAccountNumber: '',
  categoryId: '',
  city: '',
  country: 'India',
  email: '',
  fullDescription: '',
  gstNumber: '',
  ifsc: '',
  landmark: '',
  latitude: '',
  longitude: '',
  pan: '',
  phone: '',
  postalCode: '',
  searchAddress: '',
  shortDescription: '',
  slug: '',
  state: '',
  tags: '',
  upiId: '',
  website: '',
  name: '',
  ownerUserId: '',
  isFeatured: false
};

export function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isValidOptionalUrl(value: string) {
  if (!value) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidOptionalEmail(value: string) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isCreateShopStepValid(stepId: CreateShopStepId, form: CreateShopFormState) {
  if (stepId === createShopStepIds.basicInfo) {
    return Boolean(form.name.trim()) && shopSlugRegex.test(form.slug);
  }

  if (stepId === createShopStepIds.contact) {
    return Boolean(form.phone.trim()) && isValidOptionalEmail(form.email) && isValidOptionalUrl(form.website);
  }

  if (stepId === createShopStepIds.category) {
    return Boolean(form.categoryId);
  }

  if (stepId === createShopStepIds.location) {
    return Boolean(form.addressLine1.trim() && form.area.trim() && form.city.trim() && form.state.trim() && form.postalCode.trim());
  }

  return true;
}

export function isCreateShopFormReadyForSubmit(form: CreateShopFormState) {
  return (
    isCreateShopStepValid(createShopStepIds.basicInfo, form) &&
    isCreateShopStepValid(createShopStepIds.contact, form) &&
    isCreateShopStepValid(createShopStepIds.category, form) &&
    isCreateShopStepValid(createShopStepIds.location, form) &&
    Boolean(form.ownerUserId)
  );
}
