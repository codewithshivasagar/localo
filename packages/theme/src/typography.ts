export const localoTypography = {
  fontSans:
    "Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  fontMono:
    "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  headingWeight: "700",
  bodyWeight: "400",
  labelWeight: "600",
  lineHeightTight: "1.15",
  lineHeightNormal: "1.5"
} as const;

export type LocaloTypography = typeof localoTypography;
