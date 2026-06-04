import { localoBaseTheme } from "./tokens";

export const localoTailwindPreset = {
  theme: {
    extend: {
      colors: {
        localo: {
          primary: localoBaseTheme.colors.primary,
          "primary-foreground": localoBaseTheme.colors.primaryForeground,
          background: localoBaseTheme.colors.background,
          surface: localoBaseTheme.colors.surface,
          "surface-muted": localoBaseTheme.colors.surfaceMuted,
          text: localoBaseTheme.colors.text,
          "text-muted": localoBaseTheme.colors.textMuted,
          border: localoBaseTheme.colors.border,
          success: localoBaseTheme.colors.success,
          warning: localoBaseTheme.colors.warning,
          danger: localoBaseTheme.colors.danger,
          info: localoBaseTheme.colors.info
        },
        "localo-status": localoBaseTheme.statusColors
      },
      borderRadius: localoBaseTheme.radius,
      boxShadow: localoBaseTheme.shadows,
      spacing: localoBaseTheme.spacing,
      fontFamily: {
        sans: localoBaseTheme.typography.fontSans.split(", "),
        mono: localoBaseTheme.typography.fontMono.split(", ")
      }
    }
  }
} as const;

export type LocaloTailwindPreset = typeof localoTailwindPreset;
