import type { LocaloTheme } from "./tokens";
import { localoBaseTheme } from "./tokens";

export const localoCssVariableNames = {
  primary: "--localo-color-primary",
  primaryForeground: "--localo-color-primary-foreground",
  background: "--localo-color-background",
  surface: "--localo-color-surface",
  surfaceMuted: "--localo-color-surface-muted",
  text: "--localo-color-text",
  textMuted: "--localo-color-text-muted",
  border: "--localo-color-border",
  panel: "--localo-color-panel",
  panelForeground: "--localo-color-panel-foreground",
  accent: "--localo-color-accent",
  accentForeground: "--localo-color-accent-foreground",
  highlight: "--localo-color-highlight",
  highlightForeground: "--localo-color-highlight-foreground",
  radiusMd: "--localo-radius-md",
  radiusXl: "--localo-radius-xl",
  shadowMd: "--localo-shadow-md"
} as const;

export const createLocaloCssVariables = (theme: LocaloTheme = localoBaseTheme) => ({
  [localoCssVariableNames.primary]: theme.colors.primary,
  [localoCssVariableNames.primaryForeground]: theme.colors.primaryForeground,
  [localoCssVariableNames.background]: theme.colors.background,
  [localoCssVariableNames.surface]: theme.colors.surface,
  [localoCssVariableNames.surfaceMuted]: theme.colors.surfaceMuted,
  [localoCssVariableNames.text]: theme.colors.text,
  [localoCssVariableNames.textMuted]: theme.colors.textMuted,
  [localoCssVariableNames.border]: theme.colors.border,
  [localoCssVariableNames.panel]: theme.colors.panel,
  [localoCssVariableNames.panelForeground]: theme.colors.panelForeground,
  [localoCssVariableNames.accent]: theme.colors.accent,
  [localoCssVariableNames.accentForeground]: theme.colors.accentForeground,
  [localoCssVariableNames.highlight]: theme.colors.highlight,
  [localoCssVariableNames.highlightForeground]: theme.colors.highlightForeground,
  [localoCssVariableNames.radiusMd]: theme.radius.md,
  [localoCssVariableNames.radiusXl]: theme.radius.xl,
  [localoCssVariableNames.shadowMd]: theme.shadows.md
});

export type LocaloCssVariables = ReturnType<typeof createLocaloCssVariables>;
