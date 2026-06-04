export const localoBrandColors = {
  primaryGreen: "#16A34A",
  teal: "#0D9488",
  deepNavy: "#0F172A",
  amber: "#F59E0B",
  lightGray: "#F2F4F7",
  charcoal: "#111827",
  white: "#FFFFFF"
} as const;

export const localoSemanticColors = {
  primary: localoBrandColors.primaryGreen,
  primaryForeground: localoBrandColors.white,
  background: localoBrandColors.lightGray,
  surface: localoBrandColors.white,
  surfaceMuted: "#E5E7EB",
  text: localoBrandColors.charcoal,
  textMuted: "#667085",
  border: "#D0D5DD",
  panel: localoBrandColors.deepNavy,
  panelForeground: "#F8FAFC",
  accent: localoBrandColors.teal,
  accentForeground: localoBrandColors.white,
  highlight: localoBrandColors.amber,
  highlightForeground: localoBrandColors.charcoal,
  success: localoBrandColors.primaryGreen,
  warning: localoBrandColors.amber,
  danger: "#DC2626",
  info: localoBrandColors.teal
} as const;

export const localoStatusColors = {
  active: localoBrandColors.primaryGreen,
  pending: localoBrandColors.amber,
  approved: localoBrandColors.teal,
  rejected: localoSemanticColors.danger,
  paused: "#64748B",
  draft: "#667085",
  archived: localoBrandColors.deepNavy,
  success: localoSemanticColors.success,
  warning: localoSemanticColors.warning,
  danger: localoSemanticColors.danger,
  info: localoSemanticColors.info
} as const;

export type LocaloBrandColors = typeof localoBrandColors;
export type LocaloSemanticColors = typeof localoSemanticColors;
export type LocaloStatusColors = typeof localoStatusColors;
