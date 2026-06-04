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
  radiusMd: "--localo-radius-md",
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
  [localoCssVariableNames.radiusMd]: theme.radius.md,
  [localoCssVariableNames.shadowMd]: theme.shadows.md
});

export type LocaloCssVariables = ReturnType<typeof createLocaloCssVariables>;
