import type { ApiRecord } from '../types/api-response';
import type { PaginationQuery } from '../types/pagination';

export interface ShopOwnerSummary {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
}

export interface ShopCategorySummary {
  id: string;
  name: string;
  slug: string;
  isPrimary?: boolean;
}

export interface ShopResponse {
  id: string;
  ownerUserId?: string;
  name: string;
  slug: string;
  legalName?: string | null;
  description?: string | null;
  primaryCategoryId?: string | null;
  status?: string;
  verificationStatus?: string;
  commissionStatus?: string;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  ratingAvg?: string;
  ratingCount?: number;
  isFeatured?: boolean;
  approvedById?: string | null;
  approvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: ShopOwnerSummary;
  primaryCategory?: ShopCategorySummary | null;
}

export interface PublicShopMedia {
  id: string;
  publicUrl?: string | null;
  altText?: string | null;
}

export interface PublicShopLocation {
  id: string;
  label: string;
  addressLine1: string;
  addressLine2?: string | null;
  areaId?: string | null;
  areaName?: string | null;
  cityId?: string | null;
  cityName?: string | null;
  stateName?: string | null;
  countryName?: string | null;
  pincode?: string | null;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
}

export interface PublicShopBusinessHour {
  dayOfWeek: number;
  opensAt?: string | null;
  closesAt?: string | null;
  isClosed: boolean;
}

export interface PublicShopResponse {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  ratingAvg: string;
  ratingCount: number;
  isFeatured: boolean;
  isOpenNow: boolean;
  logoMedia?: PublicShopMedia | null;
  coverMedia?: PublicShopMedia | null;
  categories: ShopCategorySummary[];
  locations: PublicShopLocation[];
  businessHours: PublicShopBusinessHour[];
  createdAt: string;
  updatedAt: string;
}

export interface ShopFilterQuery extends PaginationQuery {
  search?: string;
  category?: string;
  city?: string;
  area?: string;
  location?: string;
  openNow?: boolean;
  status?: string;
  verificationStatus?: string;
  commissionStatus?: string;
  ownerUserId?: string;
  primaryCategoryId?: string;
  isFeatured?: boolean;
}

export type CreateShopRequest = ApiRecord & {
  ownerUserId: string;
  name: string;
};

export type UpdateShopRequest = ApiRecord;

export interface UpdateShopStatusRequest {
  status: string;
  verificationStatus?: string;
  reason?: string;
}

export interface AssignShopOwnerRequest {
  ownerUserId: string;
}

export type UpdateOwnShopRequest = ApiRecord;
export type UpdateShopLocationRequest = ApiRecord;

export interface UpdateBusinessHoursRequest {
  businessHours: ApiRecord[];
}
