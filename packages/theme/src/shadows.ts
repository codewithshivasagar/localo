export const localoShadows = {
  sm: "0 1px 2px rgb(15 23 42 / 0.08)",
  md: "0 12px 28px rgb(15 23 42 / 0.12)",
  lg: "0 28px 70px rgb(15 23 42 / 0.16)",
  authCard: "0 28px 80px rgb(15 23 42 / 0.14)"
} as const;

export type LocaloShadows = typeof localoShadows;
