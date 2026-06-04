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
          panel: localoBaseTheme.colors.panel,
          "panel-foreground": localoBaseTheme.colors.panelForeground,
          accent: localoBaseTheme.colors.accent,
          "accent-foreground": localoBaseTheme.colors.accentForeground,
          highlight: localoBaseTheme.colors.highlight,
          "highlight-foreground": localoBaseTheme.colors.highlightForeground,
          success: localoBaseTheme.colors.success,
          warning: localoBaseTheme.colors.warning,
          danger: localoBaseTheme.colors.danger,
          info: localoBaseTheme.colors.info
        },
        "localo-brand": localoBaseTheme.brandColors,
        "localo-status": localoBaseTheme.statusColors
      },
      borderRadius: {
        "localo-sm": localoBaseTheme.radius.sm,
        "localo-md": localoBaseTheme.radius.md,
        "localo-lg": localoBaseTheme.radius.lg,
        "localo-xl": localoBaseTheme.radius.xl,
        "localo-2xl": localoBaseTheme.radius["2xl"],
        "localo-full": localoBaseTheme.radius.full
      },
      boxShadow: {
        "localo-sm": localoBaseTheme.shadows.sm,
        "localo-md": localoBaseTheme.shadows.md,
        "localo-lg": localoBaseTheme.shadows.lg,
        "localo-authcard": localoBaseTheme.shadows.authCard
      },
      spacing: {
        "localo-1": localoBaseTheme.spacing[1],
        "localo-2": localoBaseTheme.spacing[2],
        "localo-3": localoBaseTheme.spacing[3],
        "localo-4": localoBaseTheme.spacing[4],
        "localo-5": localoBaseTheme.spacing[5],
        "localo-6": localoBaseTheme.spacing[6],
        "localo-8": localoBaseTheme.spacing[8],
        "localo-10": localoBaseTheme.spacing[10],
        "localo-12": localoBaseTheme.spacing[12],
        "localo-pagex": localoBaseTheme.spacing['pageX'],
        "localo-pagey": localoBaseTheme.spacing['pageY'],
        "localo-sectiony": localoBaseTheme.spacing['sectionY'],
        "localo-cardpadding": localoBaseTheme.spacing['cardPadding'],
      },
      fontFamily: {
        sans: localoBaseTheme.typography.fontSans,
        mono: localoBaseTheme.typography.fontMono,
        localo: localoBaseTheme.typography.fontSans
      }
    }
  }
} as const;

export type LocaloTailwindPreset = typeof localoTailwindPreset;
