import { localoBaseTheme } from "./tokens";

export const localoAdminTheme = {
  ...localoBaseTheme
} as const;

export const localoShopOwnerTheme = {
  ...localoBaseTheme
} as const;

export const localoPublicWebTheme = {
  ...localoBaseTheme
} as const;

export const localoAppThemes = {
  admin: localoAdminTheme,
  shopOwner: localoShopOwnerTheme,
  publicWeb: localoPublicWebTheme
} as const;

export type LocaloAppThemes = typeof localoAppThemes;
