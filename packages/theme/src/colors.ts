export const localoSemanticColors = {
  primary: "#168A53",
  primaryForeground: "#FFFFFF",
  background: "#F7F4EC",
  surface: "#FFFFFF",
  surfaceMuted: "#EEE8DA",
  text: "#17211B",
  textMuted: "#647067",
  border: "#DDD5C5",
  success: "#168A53",
  warning: "#B7791F",
  danger: "#B42318",
  info: "#2563A7"
} as const;

export const localoStatusColors = {
  active: "#168A53",
  pending: "#B7791F",
  approved: "#0F766E",
  rejected: "#B42318",
  paused: "#6B7280",
  draft: "#647067",
  archived: "#475569",
  success: localoSemanticColors.success,
  warning: localoSemanticColors.warning,
  danger: localoSemanticColors.danger,
  info: localoSemanticColors.info
} as const;

export type LocaloSemanticColors = typeof localoSemanticColors;
export type LocaloStatusColors = typeof localoStatusColors;
