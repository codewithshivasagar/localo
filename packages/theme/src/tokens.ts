import {
  localoBrandColors,
  localoSemanticColors,
  localoStatusColors
} from "./colors";
import { localoRadius } from "./radius";
import { localoShadows } from "./shadows";
import { localoSpacing } from "./spacing";
import { localoTypography } from "./typography";

export const localoBaseTheme = {
  brandColors: localoBrandColors,
  colors: localoSemanticColors,
  statusColors: localoStatusColors,
  typography: localoTypography,
  spacing: localoSpacing,
  radius: localoRadius,
  shadows: localoShadows
} as const;

export type LocaloTheme = typeof localoBaseTheme;
export type LocaloThemeName = "admin" | "shopOwner" | "publicWeb";
